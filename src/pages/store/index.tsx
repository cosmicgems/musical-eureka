import React from 'react'
import Layout from '../../components/Layout'
import { Box, Typography } from '@mui/material'
import Store from '../../components/Store/css/Store.module.css'
import { grey } from '@mui/material/colors'
import { shopifyClient, parseShopifyResponse } from '../../../lib/shopify'
import ProductsList from '../../components/Store/Products/ProductsList'

const StoreHome = ({products}) => {
    console.log(process.env.SHOPIFY_STORE_DOMAIN);
    console.log(products);
    
  return (
    // <Box sx={{bgcolor:grey[500]}}>
        <Layout>
            <div className='flex flex-col  min-h-[85vh]'>
                <Typography variant='h3' component="div" className='gradient-text'>
                    Store Home
                </Typography>

                <div>
                    <ProductsList products={products} />
                </div>

                
            </div>
        </Layout>        
    // </Box>

    
  )
}

export const getStaticProps = async () => {
    

    const products = await shopifyClient.product.fetchAll();
    // let products =["product"]
    const parsedProducts = parseShopifyResponse(products);
    return {
        props: {
            products: parsedProducts,
        }
    }
}

export default StoreHome