import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import React, {useState} from "react";

export const config = {
    api: {
        bodyParser: false,
    },
};


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "POST") {
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        const formData = new FormData();
        const parseForm = () => {
            return new Promise<void>((resolve, reject) => {
              form.parse(req, (err, fields, files) => {
                if (err) {
                  console.error(err);
                  reject('Form parsing error');
                } else {
                  const { upload_preset } = fields;
                  const { file } = files;
                  console.log(file);
                  
                  formData.append('file', file);
                  formData.append('upload_preset', 'user_photo_update');
                  resolve();
                }
              });
            });
          };
          try {
            await parseForm(); // Use await to parse the form
            console.log(formData);
            
            // Now you can make the Cloudinary API request
            const photo_cloudinary = await fetch('https://api.cloudinary.com/v1_1/dyfhsjtwo/image/upload', {
              method: 'POST',
              body: formData,
            }).then((r) => r.json());
            
            console.log(photo_cloudinary);
            
            res.status(200).json({ message: 'Photo successfully uploaded to Cloudinary!', photo_cloudinary });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred' });
          }
    } else {
        res.status(500).json({message: "Your request is unauthorized."})
    }
}
