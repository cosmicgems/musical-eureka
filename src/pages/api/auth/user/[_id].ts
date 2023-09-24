import User from "../../../../../lib/models/user";
import connectDB from "../../../../../lib/connectDB";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "PUT") {

       

        await connectDB();
        const {_id} = req.query;
        const {modified_user} = req.body;

        
        console.log("{ ",_id, ": ", modified_user, " }");

        
        
        const user = await User.findByIdAndUpdate({_id}, {
            photo: modified_user.photo,
            first_name: modified_user.first_name,
            last_name: modified_user.last_name,
            about: modified_user.about
        }, {new: true});

        console.log(user);
        


        res.status(200).json({message: "User successfully updated!", _id, user,})
    } else {
        res.status(500).json({message: "Your request is unauthorized."})
    }
}

//