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
            
            const { name, description, photo_landscape, photo_portrait, checkedSubcategory: sub } = req.body;

            let sub_categories = sub && sub.toString().split(",");

            const slug = slugify(name).toLowerCase();

            const category = new Category({
                name, 
                slug, 
                description, 
                photo_landscape, 
                photo_portrait,
                sub_categories: [],
            });

            category.sub_categories = sub_categories;

            category.save();

            console.log(category);
            
            res.status(200).json({message: category})


        } catch (error) {
            
        }
    }
}