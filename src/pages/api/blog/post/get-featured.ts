import connectDB from "../../../../../lib/connectDB";
import Blog from "../../../../../lib/models/blog";
import Category from "../../../../../lib/models/category";
import SubCategory from "../../../../../lib/models/sub_category";
import Tag from "../../../../../lib/models/tag";
import User from "../../../../../lib/models/user";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if(req.method === "GET"){
        try {
            await connectDB()
            await Category.find({});
            await SubCategory.find({})
            await User.find({});
            await Tag.find({});

            const featured = await Blog.find({featured:true})
            .populate("categories")
            .populate("subcategories")
            .populate("postedBy")
            .populate("tags")
            console.log(featured, "Backend Message");
            

            res.status(200).json({message: "Featured posts successfully fetched." , featured})
        } catch (error) {
            console.error(error)
        }
    } else {
        res.status(500).json({message: "Your request is unauthorized."})
    }
}