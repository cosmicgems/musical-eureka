import SubCategory from "../../../../../lib/models/sub_category";
import Blog from "../../../../../lib/models/blog";
import connectDB from "../../../../../lib/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import Category from "../../../../../lib/models/category";


export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === "GET"){
        try {

            await connectDB();
            await Category.find({});
            await SubCategory.find({});

            const {slug} = req.query;
            let match = []
            match.push(slug)

            console.log(match);
            
                        
            const all_blogs = await Blog.find()
                                        .populate("categories")
                                        .populate("sub_categories")


                                            

            const desired_posts = all_blogs.filter((blog) =>
                blog.categories.some((category) =>
                    match.includes(category.slug)
                )
            );
            console.log("This is the sign$%$^&%$#@$%^&%$#",desired_posts, "backend");
            

            res.status(200).json({message: "Successfully retrieved posts.", desired_posts})
            



        } catch (error) {
            console.log(error);
            res.status(500).json({message: "There was an error handling your request. Please try again.", error: error})
            
        }
    } else {
        res.status(500).json({message: "Your request is unauthorized."})
    }
}