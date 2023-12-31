import { 
    NextApiRequest, 
    NextApiResponse 
} from "next";
import connectDB from "lib/connectDB";
import User from "lib/models/user";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "PUT") {
        await connectDB()
        const { userId, productId } = req.query;
        const { recentlyViewedItem } = req.body;
        console.log(userId);
        const user = await User.findById(userId);

                                // console.log(user);
                                

        

        const exist = user.recentlyViewed.some(item => item.name === recentlyViewedItem.name);
        console.log(`exist: ${exist}`);

        
        if(exist){
            const product =  user.recentlyViewed.filter((pro) => pro.shopifyId === recentlyViewedItem.shopifyId) 
            console.log(`product: ${product}`);
            
            const removeRecent = await User.findByIdAndUpdate(
                userId,
                    { $pull: { recentlyViewed: { shopifyId: productId } } },
                { new: true }
            );

            removeRecent.save()
            console.log(`recently-removed:${removeRecent}`);
            
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                    {
                        $push: {
                            recentlyViewed: {
                                name: recentlyViewedItem.name,
                                price: recentlyViewedItem.price,
                                shopifyId: recentlyViewedItem.shopifyId,
                                image: recentlyViewedItem.image,
                                path: recentlyViewedItem.path,
                                description: recentlyViewedItem.desc,
                                qty: recentlyViewedItem.qty,
                            },
                        },
                    },
                { new: true }
            );
            console.log(updatedUser);
            

            res.status(200).json({
                message: `Successful ${productId} ${userId}  `,
                updatedUser
            })
        } else {
            const updatedUser = await User.findByIdAndUpdate(
                userId, 
                {$push: { recentlyViewed: { 
                    name: recentlyViewedItem.name ,
                    price:  recentlyViewedItem.price ,
                    shopifyId: recentlyViewedItem.shopifyId,
                    image: recentlyViewedItem.image ,
                    path: recentlyViewedItem.path ,
                    description: recentlyViewedItem.desc ,
                    qty: recentlyViewedItem.qty ,
                }}},
                { new: true }
            )
            // console.log(updatedUser);
            
            res.status(200).json({
                message: `Successful ${productId} ${userId}  `,
                updatedUser
            })           
        }

    } else {
        res.status(500).json({
            message: "Your request is unauthorized."
        })
    }
}