import connectDB from "../../../../../lib/connectDB";
import Category from "../../../../../lib/models/category";
import SubCategory from "../../../../../lib/models/sub_category";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if( req.method === "GET") {
        try {
            await connectDB()
            const {slug} = req.query;
            console.log(slug);
            await SubCategory.find({})
            const category = await Category.findOne({slug})
                                    .populate("sub_categories")
                                    .exec();
            console.log(category);
            

            res.status(200).json({message: 'Slug successfully passed.', category})
            
        } catch (error) {
            res.status(500).json({message: `There was a problem fetching category. Please try again.`, error: error})
        }
    }
}