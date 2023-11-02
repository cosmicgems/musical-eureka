import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router'
import Box from '@mui/material/Box';
import { ImageListItem, Typography, ImageList, ButtonGroup, Button } from '@mui/material';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import {motion} from "framer-motion"
import { useStateContext } from '../../../../Context/StateContext';
import { grey, teal } from '@mui/material/colors';
import ProductCard from './ProductCard';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';


const Product = ({product, goToProductPage}) => {
  const router = useRouter();
  const { onAdd  } = useStateContext();
  const [showCartActions, setShowCartActions] = useState<boolean>(false);

  const { id, title, images, variants, handle } = product
  const { src: productImage } = images[0]
  const { price } = variants[0];

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

  const [ bgImage, setBgImage] = useState(0);


  const handleClick = (e:any, handle:string) => {
    e.preventDefault();
    goToProductPage(handle);
  }
  
  return (
        <div>
          <motion.div 
          onHoverStart={()=>{setShowCartActions(true)}}
          onHoverEnd={()=>{setShowCartActions(false)}}
          onClick={(e)=>{handleClick(e,handle)}}
          style={{backgroundImage: `url(${images[bgImage].src})`,
          boxShadow: '2px 2px 5px 3px #dedede' , 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat'}} 
          whileHover={{scale:1.1, cursor: "pointer"}}
          className='rounded-lg'
          >
            {/* <ImageListItem sx={{boxShadow: '2px 2px 5px 3px #dedede' , borderRadius: "5px"}}   className='w-[300px]' 
              onClick={() => goToProductPage(handle)}>
              <div className=''> 
                <img
                src={`${productImage}`}
                srcSet={`${productImage}`}
                alt={title}
                loading="lazy"
                className='object-cover  w-full rounded'
                /> */}

                  {/* <ImageListItemBar
                  className='truncate-text'
                    title={title}
                    subtitle={price.amount}
                    position="below"

                  /> */}

  {/* 
              </div>


        </ImageListItem> */}
              {
                !showCartActions ?
                <div  className=' w-[250px] sm:w-[300px] min-h-[400px] flex flex-col justify-end'>
                  <div className='bg-slate-950/50 py-2 px-2' style={{borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px'}}>
                    <Typography variant='body1' component="div" sx={{color:grey[50]}}>
                      {title}
                    </Typography>
                    <Typography variant='body1' component="div" sx={{color:grey[50]}}>
                      {USDollar.format(price.amount)}
                    </Typography>   
                  </div>
       
                </div>    
                :
                showCartActions ?
                <div  className=' w-[250px] sm:w-[300px] min-h-[400px] flex flex-col justify-end '>
                <ButtonGroup variant='contained'>
                  <Button onClick={()=>{onAdd(product, 1)}} sx={{borderTopLeftRadius: '0', borderTopRightRadius: '0'}} className='w-full'>
                    Add to Cart
                  </Button>
                  <Button sx={{borderTopLeftRadius: '0', borderTopRightRadius: '0'}} className='w-full'>
                    Buy Now
                  </Button>
                </ButtonGroup>       
              </div>   
              :
              null       
              }

    </motion.div>           
        </div>
    
    

  )
}

export default function ProductsList({products}) {
  const router = useRouter()
  // Navigate to product page with handle i.e /products/black-converses
  const goToProductPage = productHandle => router.push(`/store/products/product/${productHandle}`);

  const heroRef = useRef<HTMLDivElement>(null);
  const collectionRef = useRef<HTMLDivElement>(null);
  
  const handleCollectionNav = (direction) => {
    if (heroRef.current) {
      if (direction === 'left') {
        heroRef.current.scrollLeft -= 200;
      }
      if (direction === 'right') {
        heroRef.current.scrollLeft += 200;
      }
    }
  };
  
  const handleHeroNav = (direction) => {
    if (heroRef.current) {
      if (direction === 'left') {
        heroRef.current.scrollLeft -= 400;
      }
      if (direction === 'right') {
        heroRef.current.scrollLeft += 400;
      }
    }
  };
  



  return (
    <Box className="w-screen sm:max-w-[75%] flex items-center ">
      <div className='hidden lg:flex absolute '>
          <Button className='' sx={{color: teal[200],}}   onClick={() => handleHeroNav('left')}>
            <ArrowCircleLeftRoundedIcon sx={{fontSize: "5rem"}} />
          </Button>
      </div>
      <div  className='flex overflow-x-hidden pl-6 sm:pl-12 py-6 pr-12 gap-6 sm:gap-20 ' ref={heroRef}>
        
          {
        (products && products.length > 0) ?
        <>
        {products.map((product) => (
          <div key={product.handle}>
            <ProductCard
              
              product={product}
              goToProductPage={goToProductPage}
            />            
          </div>

          ))}
        </>
          :
        <Typography variant="body1" align="center">There are no products in this collection</Typography>
      }
               
      </div>

      <div className='hidden lg:flex absolute right-0'>
          <Button sx={{color: teal[200], }}  onClick={() => handleHeroNav('right')}>
              <ArrowCircleRightRoundedIcon sx={{fontSize: "5rem", }} />
          </Button>
      </div>
    </Box>
  )
};