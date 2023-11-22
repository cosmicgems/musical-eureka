import React, { FC } from 'react'
import Layout from '../../components/Layout'
import { Typography } from '@mui/material'
import { shopifyClient, parseShopifyResponse } from '../../../lib/shopify'
import Hero from '../../components/Store/Home Page/Hero/Hero'
import Collections from '../../components/Store/Home Page/Collections/Collections'
import { AllProducts, callShopify } from '../../../helpers/shopify'
import getAllProducts from '@framework/product/get-all-products'
import { getConfig } from '@framework/api/config'
import { useApiProvider } from '@common'

const StoreHome = ({products, collections, pro}) => {
    console.log(pro);
    
    
    

  return (
    // <Box sx={{bgcolor:grey[500]}}>
        <Layout>
            <div className='flex flex-col  sm:min-h-[85vh] mt-10 pt-10  w-screen sm:w-full '>
                <Typography variant='h3' sx={{fontSize:{xs:"2.05rem", sm:"3rem"}}}  className='gradient-text-home sm:text-center px-6'>
                    Store. <span className='' style={{color: "#000"}}>The essentials for curating a lifestyle worth living.</span>
                </Typography>
                
                <div className='sm:w-full'>
                    <Hero products={products}  />
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
        const config = getConfig();
        const response = await callShopify(AllProducts)
        const products = response.data.products.edges
        const collections = await shopifyClient.collection.fetchAll();
        const p = await getAllProducts(config);

    return {
        props: {
            products: parseShopifyResponse(products), collections: parseShopifyResponse(collections), pro: p
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