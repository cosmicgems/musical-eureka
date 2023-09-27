import Blog from "../../../../../../lib/models/blog";
import connectDB from "../../../../../../lib/connectDB";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if(req.method === "PUT"){
        try {

            await connectDB()

            const { id } = req.body;
            console.log(req.body);
            

            const blog = await Blog.findById(id);

            if (blog) {
            const updatedFeatured = !blog.featured; 
            const updatedBlog = await Blog.findByIdAndUpdate(id, { featured: updatedFeatured }, { new: true });

                res.status(200).json({message: "Blog successfully updated", updatedBlog})
            } else {
                res.status(404).json({message: "Document not found."})
            }
            
 
        } catch (error) {
            console.error(error)
        }
    } else {
        res.status(500).json({message: "Your request is unauthorized."})
    }
}