import connectDB from "../../../../../lib/connectDB";
import slugify from "slugify";
import { NextApiRequest, NextApiResponse } from 'next';
import Category from "../../../../../lib/models/category";

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

            const category = new Category({
                name, slug, description, photo_landscape, photo_portrait
            });

            category.save();

            console.log(category);
            
            res.status(200).json({message: category})


        } catch (error) {
            
        }
    }
}