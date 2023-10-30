import React, { useState } from 'react'
import { shopifyClient, parseShopifyResponse } from '../../../../../lib/shopify'
import Layout from '../../../../components/Layout';
import { Box, Button, ButtonGroup, CardMedia, Typography } from '@mui/material';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import {motion} from "framer-motion"

const ProductPage = ({product}) => {
  console.log(product);

  const [photo, setPhoto] = useState<number>(0)
  

  return (
    <Box>
      <Layout>

        <div className='mt-10 pt-10 px-6 md:px-12 flex flex-col gap-6 mb-6'>

          <Typography variant='h4' className='' sx={{}}>
            {product.title}
          </Typography>

          <div className='flex flex-col sm:flex-row gap-12'>

            <div className='flex flex-col w-screen h-[50%] md:w-1/3  gap-3'>
              <CardMedia 
              component="img"
              image={product.images[photo].src}
              alt={product.description}
              className=' rounded-xl w-screen h-[50%] md:w-full md:max-h-[55vh]  '
              sx={{objectFit: "cover"}}
              /> 
              <div className='flex gap-1 justify-center items-center'>
                <div onClick={()=> {if (photo === 0){return}; setPhoto(photo-1)}}>
                  <ArrowLeftRoundedIcon  />
                </div>
                

                <div className='flex gap-3'>
                  {product.images.map((img, index) => (
                    <motion.div 
                    key={img.id}
                    onHoverStart={()=>{setPhoto(index)}}
                    >
                      <CardMedia 
                      key={img.id}
                      component="img"
                      image={img.src}
                      alt={img.title}
                      sx={{}}
                      className=''
                      />
                    </motion.div>

                  ))}
                </div>

                <div onClick={()=> {if (photo === product.images.length - 1 ){return}; setPhoto(photo + 1)}}>
                <ArrowRightRoundedIcon />
                </div>
              </div>
            </div>


            <div className='flex flex-col gap-6 md:w-1/2'>
              <Typography variant='body1' sx={{}} component="div" className=''>
                {product.description}
              </Typography>
              
              <div className='flex gap-3'>
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
          <div className='flex flex-col gap-3'>
            <Typography variant='h4' component="div" className='' sx={{}}>
              Products You May Like
            </Typography>
          <div className='flex gap-3 w-full overflow-x-auto'>
            {[0,1,2,3,4,5,6,7,8,9].map((img)=>(
              <div key={img} className='flex flex-col justify-center items-center'>
                <CardMedia 
                component='img'
                image="https://images.pexels.com/photos/6634844/pexels-photo-6634844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                sx={{}}
                className=''
                />
                <Typography variant='h5' className='gradient-text-category' sx={{}} component="div">
                  Items pleaceholder
                </Typography>
              </div>              
            ))}
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

  const product = await shopifyClient.product.fetchByHandle(slug);

  return {
    props: { product: parseShopifyResponse(product) },
    revalidate: 60,
  }

}

export default ProductPage