import React, { useRef, useState } from 'react'
import { shopifyClient, parseShopifyResponse } from '../../../../../lib/shopify'
import Layout from '../../../../components/Layout';
import { Box, Button, ButtonGroup, CardMedia, TextField, Typography } from '@mui/material';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import {motion} from "framer-motion"
import { USDollar } from '../../../../../helpers/usd';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { AllProducts, ProductByHandle, callShopify } from '../../../../../helpers/shopify';
import { useRouter } from 'next/router';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import { grey, teal } from '@mui/material/colors';
import { useStateContext } from '../../../../../Context/StateContext';

const ProductPage = ({product, products}) => {
  const router = useRouter();

  const similarProducts = products.filter((pro) =>{
    return pro.node.productType == product.productType
  }
  )
  
  const { onAdd } = useStateContext();

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
  console.log(product);

  const navRef = useRef<HTMLDivElement>(null);
  
  const handleNav = (direction) => {
    if (navRef.current) {
      if (direction === 'left') {
        navRef.current.scrollLeft -= 400;
      }
      if (direction === 'right') {
        navRef.current.scrollLeft += 400;
      }
    }
  };

  const handleAddToCart = () => {
    const bp = products.filter((pro) => {
      return pro.node.id === product.id
    })
    const buyProduct = bp[0]
    onAdd(buyProduct, quantity)
    console.log("buy product:", buyProduct);
    
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
                  image={product.images.edges[photo].node?.url}
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
                        key={`${img.node.url} alternative views`}
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

                    <div onClick={()=> {if (photo === product.images.edges.length - 1 ){return}; setPhoto(photo + 1)}}>
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
                    <div className='flex flex-col text-center'>
                        <Typography variant='body1' className={product.totalInventory <= 5 ? "gradient-text-three" : "gradient-text-four"}>
                          Stock
                        </Typography>
                        <Typography variant='body2' className=''>
                          {product.totalInventory}
                        </Typography>
                    </div>
                    <ButtonGroup className=''>
                      <Button onClick={()=> {handleQuantity("negative")}} variant='contained'>
                        <RemoveRoundedIcon />
                      </Button>
                      <Button variant='outlined' className='w-[75px] md:w-[75px]'>
                        <TextField variant='outlined' value={quantity} sx={{textAlign: "center"}} className='' onChange={(e)=>{handleTypedQuantity(e.target.value)}} />
                      </Button>
                      <Button variant='contained'>
                        <AddRoundedIcon onClick={()=> {handleQuantity("positive")}} />
                      </Button>
                    </ButtonGroup>
                    <Button onClick={handleAddToCart} className='w-full' variant="contained">
                      Add to Cart
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

            <div className='flex items-center'>
              <div className='hidden lg:flex absolute '>
                <Button className='' sx={{color: teal[200],}}   onClick={() => handleNav('left')}>
                  <ArrowCircleLeftRoundedIcon sx={{fontSize: "3rem"}} />
                </Button>
              </div>
                <div ref={navRef} className='flex gap-12 pb-3 sm:gap-16 w-full md:w-full overflow-x-auto md:overflow-x-hidden px-3 md:px-6 pb-3 sm:pb-6 cursor-pointer' >
                  {similarProducts.map((p, i)=>(
                    <div onClick={()=>{router.push(`/store/products/product/${p.node.handle}`)}} key={`${p.node.id} similar products`} className='flex flex-col justify-center items-center rounded' style={{backgroundImage: `url('${p.node.images.edges[0].node.url}')`, backgroundPosition: 'center',boxShadow: '5px 5px 7px 5px #dedede', backgroundRepeat:'no-repeat', backgroundSize: "cover"}}>
                      <div className='w-[40vw] h-[24vh] sm:w-[14vw] sm:h-[30vh]'>
                        <div className='bg-slate-950/50 rounded-t p-1'>
                          <Typography variant='caption' className='gradient-text' sx={{}} component="div">
                            {p.node.title}
                          </Typography>                       
                        </div>
                      
                      </div>

                    </div>              
                  ))}
                </div> 
                <div className='hidden lg:flex absolute right-0'>
                  <Button sx={{color: teal[200], }}  onClick={() => handleNav('right')}>
                    <ArrowCircleRightRoundedIcon sx={{fontSize: "3rem", }} />
                  </Button>
                </div>                
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
  const response2 = await callShopify(AllProducts)
  const products = response2.data.products.edges
        console.log(products);
        
  return {
    props: { product: parseShopifyResponse(product), products: parseShopifyResponse(products) },
    revalidate: 60,
  }

}

export default ProductPage