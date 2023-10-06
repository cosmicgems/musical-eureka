import { NextApiRequest, NextApiResponse } from "next";
import Blog from "../../../lib/models/blog";
import connectDB from "../../../lib/connectDB";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "PUT") {
        try {
            await connectDB()
            // Fetch all documents from the 'Blog' collection
            const documentsToUpdate = await Blog.find({});
            
            // Iterate through each document and set the default value for 'favorite_posts'
            for (const doc of documentsToUpdate) {
                if (!doc.favorite_posts || doc.favorite_posts.length === 0) {
                    doc.favorite_posts = []; // Set a default empty array if it's not already set
                }
                await doc.save(); // Save the updated document
            }
            
            console.log(`Updated ${documentsToUpdate.length} documents.`);
            res.status(200).json({ message: `Updated ${documentsToUpdate.length} documents.` });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        // Handle other HTTP methods or return an appropriate response
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
