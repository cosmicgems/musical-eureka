import connectDB from "../../../../../lib/connectDB";
import slugify from "slugify";
import { NextApiRequest, NextApiResponse } from 'next';
import Tag from "../../../../../lib/models/tag";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === "POST"){
        try {
            console.log("Connecting to db");
            await connectDB();
            console.log("Db connected");
            
            const { name } = req.body;

            const slug = slugify(name).toLowerCase();

            const tag = new Tag({
                name,
                slug 
            });


            tag.save();

            console.log(tag);
            
            res.status(200).json({message: tag})


        } catch (error) {
            
        }
    }
}