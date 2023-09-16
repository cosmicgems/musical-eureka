import connectDB from "../../../../../lib/connectDB";
import Blog from "../../../../../lib/models/blog";
import Category from "../../../../../lib/models/category";
import SubCategory from "../../../../../lib/models/sub_category";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if( req.method === "GET") {
        try {
            const {slug} = req.query;
            console.log(slug);
            const categories = await Category.find({})
            const sub_categories = await SubCategory.find({})
            const post = await Blog.findOne({slug})
                                    .populate("categories")
                                    .populate("sub_categories")
                                    .exec();
            console.log(post);
            

            res.status(200).json({message: 'Slug successfully passed.', post})
            
        } catch (error) {
            res.status(500).json({message: `There was a problem fetching post. Please try again.`, error: error})
        }
    }
}