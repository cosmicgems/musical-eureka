import { Box, Typography } from '@mui/material'
import React, { useRef} from 'react'
import { Layout } from '@components/big-three-components';
import { grey, } from '@mui/material/colors'
import ProductContainer from '../../../components/Store/Products Page/ProductContainer'
import { getConfig } from '@framework/api/config'
import { getAllProducts } from '@framework/product'
import { ScrollableContainer } from '@components/Store/UI'
import MarketingMessage from '@components/Store/Home Page/MarketingMessage'

const ProductsPage = ({products}) => {
  console.log(products);

  const data = {
    title: "Products",
    message: "Essentials for a lifestyle worth living.",
    titleColor: 'gradient-text', 
    bgColor: grey[900], 
    textColor: grey[50]
  }

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
    


                <div className=' sm:max-w-1/4 flex justify-center items-center  '>
                    <MarketingMessage data={data} />
                </div>

                <ScrollableContainer data={products} handleHeroNav={handleProductsNav} heroRef={productsRef} type="products" >

                  <ProductContainer products={products} />

                </ScrollableContainer>


        </div>

      </Layout>
    </Box>
  )
}

export const getStaticProps = async () => {
  try {
    const config = getConfig()
    const products = await getAllProducts(config)

    return {
      props: {
        products
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