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

const ProductsPage = ({products}) => {
  const [loadedProducts, setLoadedProducts] = useState<any>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(null);
  const [loading, setLoading] =useState<boolean>(false);
  const [cursor, setCursor] = useState<string>(products[products.length - 1].cursor)

  const loadMoreRef = useRef<HTMLDivElement>(null);
  const loadMoreTwoRef = useRef<HTMLDivElement>(null);

const lastProductIndex = loadedProducts.length + products.length - 1

  const router = useRouter()

  const goToProductPage = productHandle => router.push(`/store/products/product/${productHandle}`);


  const loadMoreProducts = useCallback(async ( hasNextPage, ) => {
    
    const data = {first: 24, after: cursor}
    try {
        
        if (hasNextPage || hasNextPage === null) {
            setLoading(true);
            const res =  await axios.post("/api/store/load-more-products", {data});
            console.log(res.data);

            

        
            setLoadedProducts((prevLoadedProducts) => [
              ...prevLoadedProducts,
              ...res.data.products.data.products.edges.map((pro) => pro)
            ]);

            if(res.data.products.data.products.pageInfo.hasNextPage){
              setHasNextPage(true);
              setCursor(res.data.products.data.products.pageInfo.endCursor)
              setLoading(false)
            } else {
              setHasNextPage(false);
              setCursor(res.data.products.data.products.pageInfo.endCursor)
              setLoading(false)
            }
    } else {
        // All blogs are loaded
        console.log('All blogs are loaded.');
    }
    } catch (error) {
        console.error('Error fetching more blogs:', error);
    } finally {
        setLoading(false);
    }
}, [cursor]);

useEffect(() => {
  if(!loadMoreRef?.current) return;
  
  // if(!hasNextPage) return;
  const observer = new IntersectionObserver(
      (entries) => {
          if (entries[0].isIntersecting) {
              
              // Load more blogs when the target div becomes visible
              loadMoreProducts( hasNextPage);
          }
      },
      { threshold: 0.2 } // Adjust the threshold as needed
  );

  if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
              console.log("It triggered");
  }

  const v = loadMoreRef.current

  return () => {
      if (v) {
          observer.unobserve(v);
      }
  };
}, [ hasNextPage, loadMoreProducts]);

useEffect(() => {
  if(!loadMoreTwoRef?.current) return;
  
  if(hasNextPage === false) return;
  const observer = new IntersectionObserver(
      (entries) => {
          if (entries[0].isIntersecting) {
              
              // Load more blogs when the target div becomes visible
              loadMoreProducts(hasNextPage);
          }
      },
      { threshold: 0.1 } // Adjust the threshold as needed
  );

  if (loadMoreTwoRef.current) {
      observer.observe(loadMoreTwoRef.current);
              console.log("It triggered");
  }
  let w = loadMoreTwoRef.current
  return () => {
      if (w) {
          observer.unobserve(w);
      }
  };
}, [ hasNextPage, loadMoreProducts]);

useEffect(()=> {
  console.log(loadedProducts);
  
}, [loadedProducts])

  const prod = async (e, cursor) => {
    console.log("clicked", cursor);
    const data = {first: 24, after: cursor}
    // e.preventDefault()
    console.log(data);
    
    const p = await axios.post("/api/store/load-more-products", {data})
    console.log(p.data.products);

    setLoadedProducts((prevLoadedProducts) => [
      ...prevLoadedProducts,
      ...p.data.products.data.products.edges.map((pro) => pro)
    ]);
    return

  }


  const productsRef = useRef<HTMLDivElement>(null);
  
  const handleProductsNav = (direction) => {
    console.log(direction);
    
    if (productsRef.current) {
      if (direction === 'left') {
        productsRef.current.scrollLeft -= 400;
      }
      if (direction === 'right') {
        productsRef.current.scrollLeft += 400;
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
    
                <div className='hidden sm:flex  p-3 w-1/5'>
                  <Box className="rounded h-[40vh] w-[17vw] p-3 md:flex md:justify-center md:items-center" sx={{bgcolor:grey[900]}}>
                      <Typography variant='h4' className=' gradient-text' sx={{}} component="div">
                      Products. <span style={{color: "#EEE"}} className='font-normal' >Meticulously Curated for a Lifestyle Worth Living.</span>
                      </Typography>              
                  </Box>
                </div>

                <div className='flex items-center w-4/5'>
                  <div className='hidden lg:flex absolute '>
                      <Button className='' sx={{color: teal[200],}}   onClick={() => handleProductsNav('left')}>
                        <ArrowCircleLeftRoundedIcon sx={{fontSize: "3rem"}} />
                      </Button>
                  </div>
                  <div className='flex overflow-x-auto md:overflow-x-hidden w-full gap-12 sm:gap-32 p-3 pb-6' ref={productsRef}>

                    
                    {
                      products.map((product, i) => {
                        if(loadedProducts.length === 0 && i === products.length - 1) {
                          return (
                            <div className='flex' key={` ${product.node.id} productsPage`}>
                              <ProductCard goToProductPage={goToProductPage} product={product} />
                             
                                <div ref={loadMoreRef} className='h-[20vh] w-[20vw]'>
                                  <Typography variant='caption' className='gradient-text-home' sx={{}} component="div">
                                    Loading more products...
                                  </Typography>
                                </div>                                
                        
                            </div>
                          )
                        }
                        
                        return (
                          <div key={` ${product.node.id} productsPage`}>
                            <ProductCard goToProductPage={goToProductPage} product={product} />
                          </div>
                        )
                      })
                    }
                    {
                      loadedProducts.length > 0 &&
                      <>
                        {
                          loadedProducts.map((product, i) => {
                            if(loadedProducts.length > 0 && i === loadedProducts.length - 1) {
                            return (
                              <div className='flex' key={` ${product.node.id} productsPage`}>
                                <ProductCard goToProductPage={goToProductPage} product={product} />
  
                                <div ref={loadMoreTwoRef} className='h-full flex justify-center items-center'>
                                  <Typography variant='caption' className='gradient-text-home' sx={{}} component="div">
                                    Loading more products...
                                  </Typography>
                                </div>
                              </div>
                            )
                          }
                            return (
                              <div key={` ${product.node.id} productsPage`}>
                                <ProductCard goToProductPage={goToProductPage} product={product} />
                              </div>
                            )
                          })
                        }                      
                      </>
                    }
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