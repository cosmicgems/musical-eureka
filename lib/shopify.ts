import Client from "shopify-buy";


export const shopifyClient = Client.buildClient({
    storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    domain: process.env.SHOPIFY_STORE_DOMAIN,
    apiVersion: process.env.SHOPIFY_API_VERSION
});


export const parseShopifyResponse = (response:any) =>  JSON.parse(JSON.stringify(response));