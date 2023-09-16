import connectDB from "../../../../../lib/connectDB";
import Blog from "../../../../../lib/models/blog";
import { NextApiRequest, NextApiResponse } from "next";
import Category from "../../../../../lib/models/category";
import SubCategory from "../../../../../lib/models/sub_category";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log("Connecting to database.");
    await connectDB();
    console.log("Connected to database.");

    if(req.method === "GET"){
        try {

            const categories = await Category.find({})
            const sub_categories = await SubCategory.find({})
            const blogs = await Blog.find({})
                                    .populate("categories")
                                    .populate("sub_categories")



            console.log(blogs);
            res.status(200).json({message: "You have successfully fetched all posts.", blogs})
            
        } catch (error) {
            console.log(error);
            res.status(500).json({error:error})
        }
    } else {
        res.status(500).json({message: "Your request is unauthorized."})
    }
    
    
}