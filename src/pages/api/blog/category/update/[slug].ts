import Category from "../../../../../../lib/models/category";
import connectDB from "../../../../../../lib/connectDB";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if(req.method === "PUT") {
        try {
            console.log("Connecting to db.");
            connectDB();
            console.log("Connected to db.");

            const {slug} = req.query
            const {name, description, photo_landscape, photo_portrait, id, sub_categories:sub} = req.body
            console.log(req.body);
            
        let sub_categories = sub && sub.toString().split(",");
            

            let cat = await Category.findByIdAndUpdate(id, {
                name,
                description, 
                photo_landscape,
                photo_portrait, 
                sub_categories: [],
            });

            cat.sub_categories = sub_categories;
            await cat.save();


            res.status(200).json({message: `You have successfully updated the ${name} category.`,  cat})
            
            
            
        } catch (error) {
            res.status(500).json({message: "Something went wrong when updating the category. Please try again.", error: error})
        }
    } else {
        res.status(500).json({message: "Your request is unauthorized."})
    }
}