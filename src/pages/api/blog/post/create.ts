import connectDB from "../../../../../lib/connectDB";
import Blog from "../../../../../lib/models/blog";
import slugify from "slugify";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log("Connecting to db");
    connectDB();
    
    
}