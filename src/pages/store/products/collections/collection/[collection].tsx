import React, { useRef } from 'react'
import { Box, Button, Typography } from '@mui/material';
import { Layout } from '@components/big-three-components';
import ProductCard from '@components/Store/Products/RefactoredComponents/products/ProductCard';
import { useRouter } from 'next/router';
import { teal } from '@mui/material/colors';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import CollectionsContainer from '@components/Store/Collections/CollectionsContainer';
import { getConfig } from '@framework/api/config';
import { getAllCollectionsPaths, getAllProducts } from '@framework/product';
import getCollectionProducts from '@framework/product/get-all-collection-products';
import { ScrollableContainer } from '@components/Store/UI';

const Collection = ({ collection }) => {
    const { name, image, path, handle , description, id, products} = collection;


    const router = useRouter()
    // Navigate to product page with handle i.e /products/black-converses
    const goToProductPage = productHandle => router.push(`/store/products/product/${productHandle}`);

  // console.log(collectionProducts)

    const tagLine = () => {
        if (handle === "candles-accessories"){
        return "Increase the Ambience."
        } else if (handle === "bath-and-body"){
        return "Your Lather Deserves Luxury."
        }
    }
    const collectionRef = useRef<HTMLDivElement>(null);

    const handleCollectionsNav = (direction) => {
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
            
            <div className='md:p-6 md:w-1/4'>
                <Box className='md:bg-black rounded md:h-full md:w-full md:flex md:justify-center md:items-center'>
                    <Typography variant='h4' component="div" className='gradient-text-home px-3 hidden sm:inline' sx={{}}>
                        {collection.name}. <span className='gradient-text' style={{}}>{tagLine()}</span>
                    </Typography>   
                    <Typography variant='h4' component="div" className='gradient-text-home px-3 sm:hidden ' sx={{}}>
                        {collection.name}. <span className='' style={{color:"#000"}}>{tagLine()}</span>
                    </Typography>            
                </Box>            
            </div>



            <ScrollableContainer 
            data={products} 
            handleHeroNav={handleCollectionsNav} 
            heroRef={collectionRef} 
            type={`collections`}
            >
                {
                    products.map((product) => {
                        console.log(product);
                        
                        return <ProductCard key={`Product Card Key: ${product.id}`} product={product} goToProductPage={goToProductPage} />
                    })
                }
            </ScrollableContainer>



            </div>

        </Layout>
    </Box>
  )
}

export const getStaticPaths = async () => {

  const config = getConfig();
  const { collections } = await getAllCollectionsPaths(config);
  

  
  return {
    paths: collections.map((c: any) => ({
      params: { collection: c.handle }
  })) ,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({params: { collection }}) => {

    const  config = getConfig()
    
    const res = await getCollectionProducts({config,  variables: { handle: collection }})



  return {
    props: {   collection: res },
    revalidate: 60,
  }

}

export default Collection