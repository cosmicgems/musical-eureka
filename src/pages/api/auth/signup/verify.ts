import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../../../lib/models/user';
import connectDB from '../../../../../lib/connectDB';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === "GET") {
    try {
      const { token, username } = req.query;

      await connectDB(); 

      let user2 = await User.findOne({username});
      
      if(user2 && user2.verification_token === token){
        const currentTimestamp = new Date();
        if (currentTimestamp <= user2.verification_token_expiration) {
          
          const user = await User.findOneAndUpdate({username}, {confirmed_account: true}, {new: true});
          res.status(200).json({ message: 'Email verified successfully', user });
          return
        } else {
          await User.deleteOne({username});
          res.status(500).json({ message: 'The link has expired. User deleted. Please register again.' });
          return
        }
        
        
      } 

      res.status(500).json({message: 'Invalid token or user not found.'})

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  } else {
    res.status(500).json({message: "Your request is unauthorized."})
  }
}
