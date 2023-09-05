import connectDB from "../../../../../lib/connectDB";
import Blog from "../../../../../lib/models/blog";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log("Connecting to database.");
    connectDB();
    console.log("Connected to database.");

    if(req.method === "GET"){
        try {

            const { page = "1", perPage = "10" } = req.query;

            // Parse page and perPage as numbers
            const parsedPage = parseInt(page as string, 10);
            const parsedPerPage = parseInt(perPage as string, 10);

            const skip = (parsedPage - 1) * parsedPerPage;
            const blogs = await Blog.find({})
                                            .skip(skip)
                                            .limit(parsedPerPage)
                                            .exec();
            console.log(blogs);
            res.status(200).json({message: "You have successfully fetched all posts.", blogs})
            
        } catch (error) {
            
        }
    } else {
        res.status(500).json({message: "Your request is unauthorized."})
    }
    
    
}