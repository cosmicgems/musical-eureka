import Blog from "../../../../../lib/models/blog";
import Category from "../../../../../lib/models/category";
import SubCategory from "../../../../../lib/models/sub_category";
import connectDB from "../../../../../lib/connectDB";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "POST"){
        try {
            await connectDB();
            await Category.find({});
            await SubCategory.find({});

            const {sub_categories} = req.body;
            let matches = [];

            sub_categories.map((m) => {
                matches.push(m.slug)
            })

            console.log(matches, "backend");

            
            const related_blogs_two = await Blog.find()
                                            .populate("sub_categories")

            const related_blogs = related_blogs_two.filter((blog) =>
                blog.sub_categories.some((subcategory) =>
                    matches.includes(subcategory.slug)
                )
            );

            

            
            

            console.log(related_blogs, "related");
            

        res.status(200).json({message: "Test.", related_blogs})
        } catch (error) {
            
        }
    } else {
        res.status(500).json({message: "Your request is unauthorized."})
    }
}