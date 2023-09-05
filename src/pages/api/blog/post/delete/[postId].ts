import connectDB from "../../../../../../lib/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import Blog from "../../../../../../lib/models/blog";



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    connectDB();

    if (req.method === "DELETE") {
        try {
            // Assuming you send the blog post ID in the request body
            const { postId } = req.query;
            console.log(postId);
            

            // Use Mongoose to find and delete the blog post
            const deletedPost = await Blog.findByIdAndDelete(postId);
            console.log(deletedPost);
            
            if (!deletedPost) {
                return res.status(404).json({ message: "Blog post not found." });
            }

            return res.status(200).json({ message: "Blog post deleted successfully.", deletedPost });
        } catch (error) {
            console.error("Error deleting blog post:", error);
            res.status(500).json({ message: "Error deleting blog post." });
        }
    } else {
        res.status(405).json({ message: "Method not allowed." });
    }
}
