import connectDB from "../../../../../lib/connectDB";
import Blog from "../../../../../lib/models/blog";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if( req.method === "GET") {
        try {
            await connectDB();
            const post = await Blog.find({}, 'slug')
            console.log(post);
            

            res.status(200).json({message: 'All slugs successfully fetched.', post})
            
        } catch (error) {
            res.status(500).json({message: `There was a problem fetching post. Please try again.`, error: error})
        }
    }
}