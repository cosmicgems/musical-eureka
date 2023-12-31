import { 
    NextApiRequest, 
    NextApiResponse 
} from "next";

import connectDB from "lib/connectDB";
import User from "lib/models/user";


export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if ( req.method === "PUT") {
        try {

            const { productId, userId } = req.query
            const { wishlistItem } = req.body
            console.log(`{productId: ${productId}, userId: ${userId}}, wishlistItem: ${JSON.stringify(wishlistItem)}`)
            await connectDB()
            const user = await User.findById(userId)


            const results = user.wishlist.filter((item) => item.name === wishlistItem.name);
            
            if (results.length > 0) {
                const updatedUser = await User.findByIdAndUpdate(
                    userId,
                    {
                        $pull: { wishlist: { name: wishlistItem.name } }
                    },
                    { new: true }
                )
                res.status(200).json({message: "Successful", productId, updatedUser})
            } else {
                const updatedUser = await User.findByIdAndUpdate(
                    userId,
                    {
                        $push: { wishlist: { 
                            name: wishlistItem.name ,
                            price:  wishlistItem.price ,
                            image: wishlistItem.image ,
                            path: wishlistItem.path ,
                            desc: wishlistItem.desc ,
                            qty: wishlistItem.qty ,
                        } }
                    },
                    { new: true }
                )
                res.status(200).json({message: "Successful", productId, updatedUser})
            }
            
            


            res.status(200).json({message: "Successful", productId, user})
        } catch (error) {
            console.error(`*****Error Message: ${error}`)
        }
    } else {
        res.status(500).json({message: "Your request is unauthorized."})
        return
    }
}