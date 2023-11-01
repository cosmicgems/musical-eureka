import { Box, Typography } from '@mui/material'
import React from 'react'
import Layout from '../../../components/Layout'
import { grey } from '@mui/material/colors'
import { parseShopifyResponse, shopifyClient } from '../../../../lib/shopify'
import ProductCard from '../../../components/Store/Products/ProductCard'
import { useRouter } from 'next/router'
import { AllProducts, callShopify } from '../../../../helpers/shopify'

const ProductsPage = ({products}) => {
  const router = useRouter()
  // Navigate to product page with handle i.e /products/black-converses
  const goToProductPage = productHandle => router.push(`/store/products/product/${productHandle}`);
  // console.log(products[0]);
  
  return (
    <Box sx={{}} className="">
      <Layout>

        <div className='flex flex-col md:flex-row gap-6 mt-6 md:mt-12'>

                <div className='sm:hidden px-3'>
                  <Typography variant='h5' className=' gradient-text-home' sx={{}} component="div">
                      Products. <span style={{color: "#000"}} className='' >Meticulously Curated for a Lifestyle Worth Living.</span>
                  </Typography>
                </div>
    
                <div className='hidden sm:flex  p-3'>
                  <Box className="rounded h-[40vh] w-[17vw] p-3 md:flex md:justify-center md:items-center" sx={{bgcolor:grey[900]}}>
                      <Typography variant='h4' className=' gradient-text' sx={{}} component="div">
                      Products. <span style={{color: "#EEE"}} className='font-normal' >Meticulously Curated for a Lifestyle Worth Living.</span>
                      </Typography>              
                  </Box>
                </div>

                <div className='flex overflow-x-auto w-full gap-12 sm:gap-32 p-3 pb-6'>
                  {
                    products.map((product) => {
                      return (
                        <div key={` ${product.id} productsPage`}>
                          <ProductCard goToProductPage={goToProductPage} product={product} />
                        </div>
                      )
                    })
                  }
                </div>

        </div>

      </Layout>
    </Box>
  )
}

export const getStaticProps = async () => {
  try {
    const response = await callShopify(AllProducts)
    const products = response.data.products.edges

    return {
      props: {
        products: parseShopifyResponse(products)
      }
    }
  } catch (error) {
    console.error(error);
    return{
      props: {
        products: []
      }
    }
  }
}

export default ProductsPage