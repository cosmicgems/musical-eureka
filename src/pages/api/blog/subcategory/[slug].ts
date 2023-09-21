import connectDB from "../../../../../lib/connectDB";
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
            const sub_category = await SubCategory.findOne({slug})
            console.log(sub_category);
            

            res.status(200).json({message: 'Slug successfully passed.', sub_category})
            
        } catch (error) {
            res.status(500).json({message: `There was a problem fetching subcategory. Please try again.`, error: error})
        }
    }
}