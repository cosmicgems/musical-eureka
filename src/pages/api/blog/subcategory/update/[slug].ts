import Category from "../../../../../../lib/models/category";
import connectDB from "../../../../../../lib/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import SubCategory from "../../../../../../lib/models/sub_category";


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
            const {name, description, photo_landscape, photo_portrait, id, } = req.body
            console.log(req.body);
            
            

            let subcategory = await SubCategory.findByIdAndUpdate(id, {
                name,
                description, 
                photo_landscape,
                photo_portrait, 
            });

            await subcategory.save();


            res.status(200).json({message: `You have successfully updated the ${name} subcategory.`,  subcategory})
            
            
            
        } catch (error) {
            res.status(500).json({message: "Something went wrong when updating the category. Please try again.", error: error})
        }
    } else {
        res.status(500).json({message: "Your request is unauthorized."})
    }
}