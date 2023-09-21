import Subscriber from "../../../../../lib/models/subscriber";
import connectDB from "../../../../../lib/connectDB";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if(req.method === "POST") {
        try {
            connectDB()

            const {first_name, last_name, email} = req.body.subscriber;
            console.log(req.body);
            

            let subscriber = await new Subscriber();

            subscriber.first_name = first_name;
            
            subscriber.last_name = last_name;

            subscriber.email = email;

            console.log(subscriber);

            res.status(200).json({message: "You have successfully subscribed to cultivating a lifestyle worth living", subscriber})
            


        } catch (error) {
            
        }
    } else {
        console.log("Your request is unauthorized.");
        res.status(500).json({message: "Your request is unauthorized."})
    }
}