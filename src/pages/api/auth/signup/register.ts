import connectDB from "../../../../../lib/connectDB";
import User from "../../../../../lib/models/user";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {

            console.log(req.body);
            
            const {
                firstName, 
                lastName, 
                username, 
                email, 
                confirmEmail, 
                password, 
                confirmPassword,
            } = req.body.signupForm;

            if (password !== confirmPassword){
                res.status(500).json({message: "Passwords do not match."})
            }


            const saltRounds = 15;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            let user = await new User();
            user.first_name = firstName;
            user.last_name = lastName;
            user.username = username;
            user.password = hashedPassword;
            user.email = email;

            console.log(user);
            user.save();
            res.status(200).json({message: "Successful", user})
            

        } catch (error) {
            res.status(500).json({message: "There was an error with your registration. Please try again."})
        }
    }
}
