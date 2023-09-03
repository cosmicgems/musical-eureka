import connectDB from "../../../../../lib/connectDB";
import Category from "../../../../../lib/models/category";
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

            const categories = await Category.find({})
            console.log(categories);
            
            
            res.status(200).json({message: "Successfully fetched all categories!", categories})
            return
        } catch (error) {
            res.status(500).json({message: error, error:error})
        }
    } else {
            res.status(500).json({message: 'Unauthorized request.'})
    }

}