import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../lib/connectDB";
import Blog from "../../../lib/models/blog";
import Category from "../../../lib/models/category";
import SubCategory from "../../../lib/models/sub_category";


export default async function autocomplete(req: NextApiRequest, res: NextApiResponse) {
    


    if (req.method === "GET") {
        let { query } = req.query; 
        if (Array.isArray(query)) {
            query = query.join(" "); 
        }

        try {
            const db = await connectDB(); 
            await Category.find({})
            await SubCategory.find({})
            const results = await Blog.aggregate([
                {
                    $search: {
                        index: "pearlbox_blogs",
                        autocomplete: {
                            query: query,
                            path: "title",
                            fuzzy: {
                                maxEdits: 1,
                            },
                            tokenOrder: "sequential",

                        },
                    },
                },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        body: 1,
                        categories: 1,
                        sub_categories: 1,
                        photo: 1,
                        slug:1,
                    },
                },
                {
                    $limit: 10,
                },
            ]).exec();
            const results_body = await Blog.aggregate([
                
                {
                    $search: {
                        index: "pearlbox_blogs",
                        autocomplete: {
                            query: query,
                            path: "body",
                            fuzzy: {
                                maxEdits: 1,
                            },
                            tokenOrder: "sequential",

                        },
                    },
                },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        body: 1,
                        categories: 1,
                        sub_categories: 1,
                        photo: 1,
                        slug:1,
                    },
                },
                {
                    $limit: 10,
                },
            ]).exec();
            
    
            return res.status(200).json({ suggestions: {results, results_body} });
        } catch (error) {
            console.error("Error searching for suggestions:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
        } else {
        res.status(500).json({ message: "Your request is unauthorized." });
        }
}
