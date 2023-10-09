import connectDB from "../../../../lib/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../lib/models/user";
import Blog from "../../../../lib/models/blog";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === "GET"){
        try {
            await connectDB();

            const {id} = req.query;
            await Blog.find({})

            const user = await User.findById(id).populate("favorite_posts");

            res.status(200).json({message: "User successfully fetched.", user})

        } catch (error) {
            console.error(`Error: ${error}`)
        }
    } else {
        res.status(500).json({message: "Your request is unauthorized."})
    }
}