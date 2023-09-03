import connectDB from "../../../../../lib/connectDB";
import SubCategory from "../../../../../lib/models/sub_category";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if(req.method === "GET"){
        try {

            console.log("Connecting to DB.");
            await connectDB();
            console.log("Connected to DB.");

            const subcategories = await SubCategory.find({})
            
            res.status(200).json({message: "Successfully fetched all subcategories!", subcategories})
            
        } catch (error) {
            res.status(500).json({message: error, error:error})
        }
    } else {
            res.status(500).json({message: 'Unauthorized request.'})
    }

}