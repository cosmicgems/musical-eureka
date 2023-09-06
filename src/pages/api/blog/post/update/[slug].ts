import Blog from "../../../../../../lib/models/blog";
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
            
            const {postData: {title, body, categories, sub_categories, photo, id}} = req.body;
            
            const post = await Blog.findByIdAndUpdate(id, {
                title,
                photo,
                categories,
                sub_categories,
                body
            })

            res.status(200).json({message: `${title} successfully updated!`, post})
            
        } catch (error) {
            
        }
    }
}