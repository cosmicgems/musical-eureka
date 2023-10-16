import connectDB from "../../../../lib/connectDB";
import SlugAdForm from "../../../../lib/models/Ad Forms/slug-ad-form";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "POST") {

        try {
            
            const { formData } = req.body;


            await connectDB();

            let form =  new SlugAdForm(formData);

            form.save();
            

            res.status(200).json({message: "Form has been successfully submitted.", form});            
        } catch (error) {
            console.error(error);
            res.status(500).json({message: `Error: ${error}`, error:error});
        }

    } else {
        res.status(500).json({message: "Your request is unauthorized."});
    }

}