import { NextApiRequest, NextApiResponse } from "next";
import Blog from "../../../../../../lib/models/blog";
import connectDB from "../../../../../../lib/connectDB";


export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === "PUT"){
        try {

            const {id} =req.query

            const blog = await Blog.findByIdAndUpdate({_id:id}, { $inc: { click_count: 1 } }, { new: true });

            res.status(200).json({message: "Click count successfully updated", blog});

        } catch (error) {
            console.error("Error:", error)
            res.status(500).json({message: "There was an error with updating page visits amount."})
        }
    } else {
        res.status(500).json({message: "Your request is unauthorized."})
    }
}