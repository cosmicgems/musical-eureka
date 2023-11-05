import React, { useRef } from 'react'
import { parseShopifyResponse, shopifyClient } from '../../../../../../lib/shopify';
import { Box, Button, Typography } from '@mui/material';
import Layout from '../../../../../components/Layout';
import { callShopify, AllProducts, CollectionProducts, CollectionLoadMoreProducts } from '../../../../../../helpers/shopify'
import ProductCard from '../../../../../components/Store/Products/ProductCard';
import { useRouter } from 'next/router';
import { teal } from '@mui/material/colors';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import CollectionContainer from '../../../../../components/Store/Home Page/Collections/Collection/CollectionContainer';
import CollectionsContainer from '../../../../../components/Store/Collections/CollectionsContainer';

const Collection = ({collection, collectionProducts, collectionName}) => {
  console.log(collectionProducts);
  
  const router = useRouter()
  // Navigate to product page with handle i.e /products/black-converses
  const goToProductPage = productHandle => router.push(`/store/products/product/${productHandle}`);

  // console.log(collectionProducts)

  const tagLine = () => {
    if (collection.handle === "candles-accessories"){
      return "Increase the Ambience."
    } else if (collection.handle === "bath-and-body"){
      return "Your Lather Deserves Luxury."
    }
  }
  const collectionRef = useRef<HTMLDivElement>(null);
  
  const handleCollectionNav = (direction) => {
    console.log(direction);
    
    if (collectionRef.current) {
      if (direction === 'left') {
        collectionRef.current.scrollLeft -= 400;
      }
      if (direction === 'right') {
        collectionRef.current.scrollLeft += 400;
      }
    }
  };


  return (
    <Box sx={{}} className="">
      <Layout>

        <div className='flex flex-col md:flex-row gap-3 mt-6'>
          
          <div className='md:p-3 md:w-1/4'>
            <Box className='md:bg-black rounded md:h-full md:w-full md:flex md:justify-center md:items-center'>
              <Typography variant='h4' component="div" className='gradient-text-home px-3 hidden sm:inline' sx={{}}>
                {collection.title}. <span className='gradient-text' style={{}}>{tagLine()}</span>
              </Typography>   
              <Typography variant='h4' component="div" className='gradient-text-home px-3 sm:hidden ' sx={{}}>
                {collection.title}. <span className='' style={{color:"#000"}}>{tagLine()}</span>
              </Typography>            
            </Box>            
          </div>


        <div className='flex items-center md:w-4/5'>

          <div className='hidden lg:flex absolute '>
              <Button className='' sx={{color: teal[200],}}   onClick={() => handleCollectionNav('left')}>
                <ArrowCircleLeftRoundedIcon sx={{fontSize: "5rem"}} />
              </Button>
          </div> 

          <div ref={collectionRef} className='flex overflow-x-auto md:overflow-x-hidden gap-12  py-3 px-3'>
            <CollectionsContainer products={collectionProducts} collectionName={collectionName} />
          </div>

          <div className='hidden lg:flex absolute right-0'>
            <Button sx={{color: teal[200], }}  onClick={() => handleCollectionNav('right')}>
              <ArrowCircleRightRoundedIcon sx={{fontSize: "5rem", }} />
            </Button>
          </div>       


        </div>


        </div>

      </Layout>
    </Box>
  )
}

export const getStaticPaths = async () => {

  const collections = await shopifyClient.collection.fetchAll();
  const slugs = collections.map((c) => c.handle);

  const paths = slugs.map((collection) => ({
    params: {collection}
  }))

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { collection } }) => {

  const products = await shopifyClient.product.fetchAll();

  const collection_res = await shopifyClient.collection.fetchByHandle(collection);
  const collections = await shopifyClient.collection.fetchAll();

  const response = await callShopify(AllProducts)
  const products2 = response.data.products.edges


  const response2 = await callShopify(CollectionLoadMoreProducts, { category: collection, first:24, after:"eyJsYXN0X2lkIjo3ODE4MjMyNjYwMTU4LCJsYXN0X3ZhbHVlIjowfQ==" });
  const collectionProducts = response2.data.collection.products.edges
  console.log(collectionProducts)


  return {
    props: { products: parseShopifyResponse(products), collection: parseShopifyResponse(collection_res), collections: parseShopifyResponse(collections), products2, collectionProducts, collectionName: collection   },
    revalidate: 60,
  }

}

export default Collection