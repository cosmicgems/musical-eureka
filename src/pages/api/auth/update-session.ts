import connectDB from "../../../../lib/connectDB";
import User from "../../../../lib/models/user";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if ( req.method === "PUT" ){
        try {
            await connectDB();

            const {userId} = req.query;
            console.log(userId);

            const user = await User.findById(userId);

        
            res.status(200).json({message: "User session updated.", user})
        } catch (error) {
            console.error(error)
        }
    } else {
        res.status(500).json({message: "Your request is unauthorized."})
    }
}