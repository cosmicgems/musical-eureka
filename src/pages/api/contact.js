// pages/api/contact.js

import sgMail from '@sendgrid/mail';
import connectDB from '../../../lib/connectDB';
import Question from '../../../lib/models/question'; // Import the Question model

// Connect to MongoDB


// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
    await connectDB()
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, phone, message } = req.body;

  try {
    // Save the form data to MongoDB using the Mongoose Question model
    let formData = await new Question({
      name,
      email,
      phone,
      message // Map the 'message' field to 'question' field in the schema
    });

    await formData.save();

    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting form.' });
  }
}
