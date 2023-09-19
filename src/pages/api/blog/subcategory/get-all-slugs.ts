import connectDB from "../../../../../lib/connectDB";
import Category from "../../../../../lib/models/category";
import { NextApiRequest, NextApiResponse } from 'next';
import SubCategory from "../../../../../lib/models/sub_category";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if(req.method === "GET"){
        try {

            await connectDB();

            
            const sub_categories = await SubCategory.find({}, 'slug')
            console.log(sub_categories);
            
            
            res.status(200).json({message: "Successfully fetched all subcategory slugs!", sub_categories})
            return
        } catch (error) {
            res.status(500).json({message: error, error:error})
        }
    } else {
            res.status(500).json({message: 'Unauthorized request.'})
    }

}