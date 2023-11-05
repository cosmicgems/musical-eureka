import { Box, Button, Typography } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Layout from '../../../components/Layout'
import { grey, teal } from '@mui/material/colors'
import { parseShopifyResponse, shopifyClient } from '../../../../lib/shopify'
import ProductCard from '../../../components/Store/Products/ProductCard'
import { useRouter } from 'next/router'
import { AllProducts, NextProducts, callShopify } from '../../../../helpers/shopify'
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import axios from 'axios'
import ProductContainer from '../../../components/Store/Products Page/ProductContainer'

const ProductsPage = ({products}) => {

  const router = useRouter()







  const productsRef = useRef<HTMLDivElement>(null);
  
  const handleProductsNav = (direction) => {
    console.log(direction);
    
    if (productsRef.current) {
      if (direction === 'left') {
        productsRef.current.scrollLeft -= 800;
      }
      if (direction === 'right') {
        productsRef.current.scrollLeft += 800;
      }
    }
  };
  
  return (
    <Box sx={{}} className="">
      <Layout>

        <div className='flex flex-col md:flex-row gap-6 mt-6 md:mt-12'>

                <div className='sm:hidden px-3'>
                  <Typography variant='h5' className=' gradient-text-home' sx={{}} component="div">
                      Products. <span style={{color: "#000"}} className='' >Meticulously Curated for a Lifestyle Worth Living.</span>
                  </Typography>
                </div>
    
                <div className='hidden sm:flex  p-3 sm:w-1/5'>
                  <Box className="rounded h-[40vh] w-[17vw] p-3 md:flex md:justify-center md:items-center" sx={{bgcolor:grey[900]}}>
                      <Typography variant='h4' className=' gradient-text' sx={{}} component="div">
                      Products. <span style={{color: "#EEE"}} className='font-normal' >Meticulously Curated for a Lifestyle Worth Living.</span>
                      </Typography>              
                  </Box>
                </div>

                <div className='flex items-center sm:w-4/5'>
                  <div className='hidden lg:flex absolute '>
                      <Button className='' sx={{color: teal[200],}}   onClick={() => handleProductsNav('left')}>
                        <ArrowCircleLeftRoundedIcon sx={{fontSize: "3rem"}} />
                      </Button>
                  </div>
                  <div className='flex overflow-x-auto md:overflow-x-hidden w-full gap-12 sm:gap-32 p-3 pb-6' ref={productsRef}>

                    
                    <ProductContainer products={products} />
                  </div>
                  <div className='hidden lg:flex absolute right-0'>
                      <Button sx={{color: teal[200], }}  onClick={() => {handleProductsNav('right')}}>
                          <ArrowCircleRightRoundedIcon sx={{fontSize: "3rem", }} />
                      </Button>
                  </div>                  
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