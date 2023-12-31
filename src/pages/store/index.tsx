import React, { FC } from 'react'
import { Layout } from '@components/big-three-components'
import { Typography } from '@mui/material'
import { shopifyClient, parseShopifyResponse } from '../../../lib/shopify'
import Hero from '../../components/Store/Home Page/Hero/Hero'
import Collections from '../../components/Store/Home Page/Collections/Collections'
import { AllProducts, callShopify } from '../../../helpers/shopify'
import getAllProducts from '@framework/product/get-all-products'
import { getConfig } from '@framework/api/config'
import { useApiProvider } from '@common'
import getAllCollections from '@framework/product/get-all-collections'


export async function getStaticProps() {
    const config = getConfig()

    const products = await getAllProducts(config)
    const collections = await getAllCollections(config)
    debugger
    // console.log(collections);
    
    return {
        props: {
            products, collections
        },
        revalidate: 4 * 60 * 60
    }
}

const StoreHome = ({
    products, collections
}) => {
    
    return (
        
            <Layout>

                <div className='flex flex-col  sm:min-h-[85vh] pt-20 md:pt-10  w-screen sm:w-full '>

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
        
    )
}




export default StoreHome