import React, { useRef } from 'react'
import Layout from '../../components/Layout'
import { Box, Button, Typography } from '@mui/material'
import Store from '../../components/Store/css/Store.module.css'
import { grey, teal } from '@mui/material/colors'
import { shopifyClient, parseShopifyResponse } from '../../../lib/shopify'
import ProductsList from '../../components/Store/Products/ProductsList'
import MarketingMessage from '../../components/Store/Home Page/MarketingMessage'
import Hero from '../../components/Store/Home Page/Hero/Hero'
import Collections from '../../components/Store/Home Page/Collections/Collections'
import { shopifyApi, LATEST_API_VERSION } from "@shopify/shopify-api"
import { AllProducts, callShopify } from '../../../helpers/shopify'
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';

const StoreHome = ({products, collections}) => {
    console.log(collections);
    
    console.log(products);
    
    console.log(products[0]);
  return (
    // <Box sx={{bgcolor:grey[500]}}>
        <Layout>
            <div className='flex flex-col  sm:min-h-[85vh] mt-10 pt-10  w-screen sm:w-full '>
                <Typography variant='h3' sx={{fontSize:{xs:"2.05rem", sm:"3rem"}}}  className='gradient-text-home sm:text-center px-6'>
                    Store. <span className='' style={{color: "#000"}}>The essentials for curating a lifestyle worth living.</span>
                </Typography>
                
                <div className='sm:w-full'>
                    <Hero products={products} />
                </div>

                <div className='sm:w-full'>
                    <Collections products={products} collections={collections} />
                </div>
                

                
            </div>
        </Layout>        
    // </Box>

    
  )
}



export const getStaticProps = async () => {
    
    try {

        const response = await callShopify(AllProducts)
        const products = response.data.products.edges
        const collections = await shopifyClient.collection.fetchAll();


    return {
        props: {
            products: parseShopifyResponse(products), collections: parseShopifyResponse(collections)
        }
    }        

    } catch (error) {
        console.error(error)
        return {
            props: {
                products: [], collections: []
            },
            revalidate: 60,
        }
    }


}

export default StoreHome