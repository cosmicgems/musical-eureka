import connectDB from "../../../../../lib/connectDB";
import slugify from "slugify";
import { NextApiRequest, NextApiResponse } from 'next';
import SubCategory from "../../../../../lib/models/sub_category";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === "POST"){
        try {
            console.log("Connecting to db");
            await connectDB();
            console.log("Db connected");
            
            const { name, description, photo_landscape, photo_portrait } = req.body;

            const slug = slugify(name).toLowerCase();

            const subcategory = new SubCategory({
                name, slug, description, photo_landscape, photo_portrait
            });

            subcategory.save();

            console.log(subcategory);
            
            res.status(200).json({message: subcategory})


        } catch (error) {
            
        }
    }
}