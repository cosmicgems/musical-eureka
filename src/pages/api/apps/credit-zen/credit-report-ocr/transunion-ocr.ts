import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../../../lib/connectDB";
import axios from "axios";
import formidable from "formidable"




export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === "POST") {

                const {file} = req.body
                console.log(req.body);
                const formData = new FormData();
                formData.append('file', req.body);
                
        try {
            

                // Handle the file data as needed
                const response = await axios.post('http://127.0.0.1:8080/api/home', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                // Example response, you will need to modify this according to your needs
                res.status(200).json({ extracted_text: response.data});

        } catch (error) {
            console.error(error)
            res.status(500).json({message: "There was an error.", error: error})
        }
    }
}