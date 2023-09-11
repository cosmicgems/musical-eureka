import connectDB from "../../../../../lib/connectDB";
import User from "../../../../../lib/models/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "POST"){
        try {
            connectDB()
            const {email} = req.body;
            console.log(email, "distinguish");
            
            const user = await User.findOne({email});
            if(user === null){
                res.status(200).json({message: "Email is not associated with any account.", user})
                return                
            }
            res.status(500).json({message: "Email is associated with an account already.", user}) 
            return

        } catch (error) {
            res.status(500).json({message: "There was an error in checking email against database."})
        }
    }
}