import connectDB from "../../../../lib/connectDB";
import User from "../../../../lib/models/user";
import Blog from "../../../../lib/models/blog";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === "PUT"){
        try {
            await connectDB();

            const {user_id, post_id} = req.query
            const user = await User.findOne({_id: user_id});
            if(user.favorite_posts.includes(post_id)){
                const indexToRemove = user.favorite_posts.indexOf(post_id);
                user.favorite_posts.splice(indexToRemove, 1); 
            
                await user.save();
            } else{

                user.favorite_posts.push(post_id);

                await user.save();
            }
            
            
            res.status(200).json({message: "Successfully added post to favorites.", liked_posts: user.favorite_posts})
        } catch (error) {
            console.log(`Error: ${error}`)
            res.status(500).json({message: "There was an error adding post to favorites."})
        }
    } else {
        res.status(500).json({message: "Your request is unauthorized."})
    }
}