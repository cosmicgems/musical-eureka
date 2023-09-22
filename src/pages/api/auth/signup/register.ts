import connectDB from "../../../../../lib/connectDB";
import User from "../../../../../lib/models/user";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from 'uuid';
import sgMail from '@sendgrid/mail';

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
            const verificationToken = uuidv4();
            const expirationDate = new Date();
            expirationDate.setHours(expirationDate.getHours() + 24);
            
            let user = await new User();
            user.first_name = firstName;
            user.last_name = lastName;
            user.username = username;
            user.password = hashedPassword;
            user.email = email;
            user.verification_token = verificationToken;
            user.verification_token_expiration = expirationDate;

            console.log(user);
            user.save();

            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            
            // Create the verification link with the verification token
            const verificationLink = `https://pearlbox.co/auth/verify-request/verify?token=${verificationToken}&username=${username}`;
            
            // HTML content for the email with background color
            const htmlContent = `
            <html>
                <body style="background-color: #f0f0f0; padding: 5vh 15vh;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                        <td align="center">
                            <h1 style="color: #333; margin-bottom: 20px;">Welcome to Pearl Box!</h1>
                            <p style="color: #555;">Thank you for signing up!</p>
                            <p style="color: #555;">To verify your email, click the link below:</p>
                            <a href="${verificationLink}" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 5px;">Verify Email</a>
                        </td>
                        </tr>
                    </table>
                </body>
            </html>
            `;
            
            const msg = {
                to: email,
                from: 'maliekjdavis24@gmail.com',
                subject: `Verify Your Email ${firstName}`,
                html: htmlContent, 
            };
    
            console.log(msg);
    
            const messageSent = await sgMail.send(msg);

            console.log(messageSent);
            
            res.status(200).json({message: "Successful", user, email:msg})
        } catch (error) {
            res.status(500).json({message: "There was an error with your registration. Please try again."})
        }
    }
}
