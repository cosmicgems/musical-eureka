import React, { useState } from 'react'
import { shopifyClient, parseShopifyResponse } from '../../../../../lib/shopify'
import Layout from '../../../../components/Layout';
import { Box, Button, ButtonGroup, CardMedia, TextField, Typography } from '@mui/material';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import {motion} from "framer-motion"
import { USDollar } from '../../../../../helpers/usd';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { ProductByHandle, callShopify } from '../../../../../helpers/shopify';


const ProductPage = ({product}) => {
  console.log(product);
  const [quantity, setQuantity] = useState<number>(1);

  const [photo, setPhoto] = useState<number>(0)

  const handleTypedQuantity = (qty) => {
    console.log(typeof qty, Number(qty));
    const value = Number(qty)
    console.log(Number.isSafeInteger(value));
    
    
    if(Number.isInteger(value)) {
      setQuantity(value)
      return
    } else if (!Number.isInteger(value)) {
      setQuantity(quantity);
      return
    }
    // setQuantity(Number(qty));
  }

  const handleQuantity = (pole) => {
    if(pole === "positive"){
      if(quantity === product.totalInventory) return
      setQuantity(quantity + 1);
      return
    } else if (pole === "negative") {
      if(quantity === 0) return
      setQuantity(quantity - 1);
      return
    }
  }
  

  return (
    <Box>
      <Layout>

        <div className='mt-3 md:mt-10 md:pt-10   flex flex-col gap-20 mb-6 w-full md:w-full'>
          
          <div className='md:px-[17vw] md:mt-12'>
            <div className='px-3 md:px-0  flex flex-col gap-3  ' >
              
              <Typography variant='h5' className=' ' component="div" sx={{}}>
                {product.title}
              </Typography>

              <div className='flex flex-col  w-full md:w-full  sm:flex-row gap-12 '>

                <div className='flex flex-col w-full h-[50%] md:w-1/3  gap-3'>
                  <CardMedia 
                  component="img"
                  image={product.images.edges[photo].node.url}
                  alt={product.title}
                  className=' rounded-xl w-full h-[50%] md:w-full md:max-h-[55vh]  '
                  sx={{objectFit: "cover"}}
                  /> 
                  <div className='flex gap-1 justify-center items-center'>
                    <div onClick={()=> {if (photo === 0){return}; setPhoto(photo-1)}}>
                      <ArrowLeftRoundedIcon  />
                    </div>
                    

                    <div className='flex gap-3'>
                      {product.images.edges.map((img, index) => (
                        <motion.div 
                        key={img.id}
                        onHoverStart={()=>{setPhoto(index)}}
                        >
                          <CardMedia 
                          key={img.id}
                          component="img"
                          image={img.node.url}
                          alt={product.title}
                          sx={{}}
                          className='h-[10vh] rounded'
                          />
                        </motion.div>

                      ))}
                    </div>

                    <div onClick={()=> {if (photo === product.images.length - 1 ){return}; setPhoto(photo + 1)}}>
                    <ArrowRightRoundedIcon />
                    </div>
                  </div>
                </div>


                <div className='flex flex-col gap-3 md:w-1/2'>
                  <Typography variant='body1' sx={{}} component="div" className=''>
                    {product.description}
                  </Typography>

                  <Typography variant='h5' component="div" className='' sx={{}}>
                    {USDollar.format(product.priceRange.maxVariantPrice.amount)}
                  </Typography>
                  
                  <div className='flex gap-3'>
                    <ButtonGroup className=''>
                      <Button onClick={()=> {handleQuantity("negative")}} variant='contained'>
                        <RemoveRoundedIcon />
                      </Button>
                      <Button variant='outlined' className='md:w-[75px]'>
                        <TextField variant='outlined' value={quantity} sx={{textAlign: "center"}} className='' onChange={(e)=>{handleTypedQuantity(e.target.value)}} />
                      </Button>
                      <Button variant='contained'>
                        <AddRoundedIcon onClick={()=> {handleQuantity("positive")}} />
                      </Button>
                    </ButtonGroup>
                    <Button variant="contained">
                      Add to Cart
                    </Button>
                    <Button variant='outlined'>
                      Buy Now
                    </Button>
                  </div>  

                </div>


              </div>            
            </div>            
          </div>



          <div className='flex flex-col gap-3 w-screen md:w-full'>

            <Typography variant='h6' component="div" className='px-3 md:px-6' sx={{}}>
              Products You May Like
            </Typography>

            <div className='flex gap-3 w-full md:w-full overflow-x-auto px-3 md:px-6 pb-3'>
              {[0,1,2,3,4,5,6,7,8,9,10,11].map((img)=>(
                <div key={img} className='flex flex-col justify-center items-center'>
                  <CardMedia 
                  component='img'
                  image="https://images.pexels.com/photos/6634844/pexels-photo-6634844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  sx={{}}
                  className=''
                  />
                  <Typography variant='h5' className='gradient-text-category' sx={{}} component="div">
                    Items placeholder
                  </Typography>
                </div>              
              ))}
            </div>

          </div>



        </div>

      </Layout>      
    </Box>

  )
}

export const getStaticPaths = async () => {

  const products = await shopifyClient.product.fetchAll();
  const slugs = products.map((p) => p.handle);

  const paths = slugs.map((slug) => ({
    params: {slug}
  }))

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {

        const response = await callShopify(ProductByHandle, {handle: slug})
        const product = response.data.productByHandle
        
  return {
    props: { product: parseShopifyResponse(product) },
    revalidate: 60,
  }

}

export default ProductPage