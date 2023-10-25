import React from 'react';
import { useRouter } from 'next/router'


import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import  from '@mui/material/ImageList';
import { ImageListItem, Typography, ImageList } from '@mui/material';
import ImageListItemBar from '@mui/material/ImageListItemBar';


const Product = ({product, goToProductPage}) => {
  const { id, title, images, variants, handle } = product
  const { src: productImage } = images[0]
  const { price } = variants[0]

  console.log(title);
  
  
  return ( <div className='w-[100%]'>
          <ImageListItem   className='' 
        onClick={() => goToProductPage(handle)}>
          <div className=''> 
                    <img
          src={`${productImage}`}
          srcSet={`${productImage}`}
          alt={title}
          loading="lazy"
          className='object-cover  w-full '
        />
        {/* <ImageListItemBar
        className='truncate-text'
          title={title}
          subtitle={price.amount}
          position="below"

        /> */}
        <Typography variant='body1' component="div">
          {title}
        </Typography>
        <Typography variant='body1' component="div">
          ${price.amount}0
        </Typography>
          </div>


      </ImageListItem>
  </div>     
    

  )
}

export default function ProductsList({products}) {
  const router = useRouter()
  // Navigate to product page with handle i.e /products/black-converses
  const goToProductPage = productHandle => router.push(`/products/${productHandle}`)


  return (
    <Box className=" max-w-screen px-3">
      {
        (products && products.length > 0) ?
        <ImageList gap={75} cols={3} sx={{width:'100%'}} className=' ' >
          {products.map((product) => (
            <Product
              key={product.handle}
              product={product}
              goToProductPage={goToProductPage}
            />
          ))}
        </ImageList>:
        <Typography variant="body1" align="center">There are no products in this collection</Typography>
      }
    </Box>
  )
};