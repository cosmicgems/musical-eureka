import { NextApiResponse, NextApiRequest } from "next";
import { AllProducts, NextProducts, callShopify } from "../../../../helpers/shopify";
import { parseShopifyResponse } from "../../../../lib/shopify";

export default async function handler (
req: NextApiRequest,
res: NextApiResponse,
){
    if( req.method === "POST" ) {
        const { after} = req.body.data;
        // console.log(after);
        let first = 24
        try {
            const response = await callShopify(NextProducts, {first, after} )

            const products = response
            console.log(products);
            

            res.status(200).json({message: "Successfully fetched products.", products: parseShopifyResponse(products)})
        } catch (error) {
            console.error(error)
            res.status(500).json({message: error})
        }
    }
}