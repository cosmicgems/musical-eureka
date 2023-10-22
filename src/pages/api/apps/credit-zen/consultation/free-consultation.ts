import connectDB from "../../../../../../lib/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import FreeConsultation from "../../../../../../lib/models/apps/credit-zen/freeConsultation";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === 'POST') {
        try {
            await connectDB()
            const {form:{firstName:first_name, lastName:last_name, email, phone, address:{line_one:a_1, line_two:a_2, city, state, zip}}} = req.body;
            console.log(req.body);
            
            
            const consultation = await new FreeConsultation({
                first_name,
                last_name,
                email,
                phone,
                address: {sequence_one: a_1, sequence_two: a_2, city, state, zip}
            });

            console.log(consultation);
            

            res.status(200).json({message: "Form successfully submitted! A representative will be in touch shortly.", form:consultation})
        } catch (error) {
            
        }
    } else {
        res.status(500).json({message: "Your request is unauthorized."})
    }
}