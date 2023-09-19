import connectDB from "../../../../../lib/connectDB";
import Blog from "../../../../../lib/models/blog";
import { NextApiRequest, NextApiResponse } from "next";
import Category from "../../../../../lib/models/category";
import SubCategory from "../../../../../lib/models/sub_category";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log("Connecting to the database.");
    await connectDB();
    console.log("Connected to the database.");

    if (req.method === "GET") {
        try {
            const { page = "1", limit = "5" } = req.query;

            // Convert page and limit to numbers, providing default values
            const pageValue = parseInt(Array.isArray(page) ? page[0] : page, 10) || 1;
            const limitValue = parseInt(Array.isArray(limit) ? limit[0] : limit, 10) || 5;

            const skip = (pageValue - 1) * limitValue;
            await Category.find({})
            await SubCategory.find({})
            const totalBlogCount = await Blog.countDocuments();
            const blogs = await Blog.find({})
                .populate("categories")
                .populate("sub_categories")
                .skip(skip)
                .limit(limitValue);

            console.log(blogs);
            res.status(200).json({
                message: "You have successfully fetched all posts.",
                blogs: { blogs, totalBlogCount },
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    } else {
        res.status(500).json({ message: "Your request is unauthorized." });
    }
}
