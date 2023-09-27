import { NextApiRequest, NextApiResponse } from "next";
import Blog from "../../../lib/models/blog";
import connectDB from "../../../lib/connectDB";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === "PUT"){
        try {
            const documentsToUpdate = await Blog.find({});
            for (const doc of documentsToUpdate) {
                doc.featured = false; // Set a default value if needed
                await doc.save();
              }
              
    console.log(`Updated ${documentsToUpdate.length} documents.`);
    res.status(200)
        } catch (error) {
            console.error(error)
        }
    } else {
        
    }
}