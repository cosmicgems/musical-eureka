import React from 'react'
import { parseShopifyResponse, shopifyClient } from '../../../../../../lib/shopify';
import { Box, Typography } from '@mui/material';
import Layout from '../../../../../components/Layout';
import { callShopify, AllProducts, CollectionProducts } from '../../../../../../helpers/shopify'
import ProductCard from '../../../../../components/Store/Products/ProductCard';
import { useRouter } from 'next/router';

const CategoryPage = ({products, collection, collections, products2, collectionProducts}) => {
  const router = useRouter()
  // Navigate to product page with handle i.e /products/black-converses
  const goToProductPage = productHandle => router.push(`/store/products/product/${productHandle}`);

  console.log(collectionProducts)

  const tagLine = () => {
    if (collection.handle === "candles-accessories"){
      return "Increase the Ambience."
    } else if (collection.handle === "bath-and-body"){
      return "Your Lather Deserves Luxury."
    }
  }

  return (
    <Box sx={{}} className="">
      <Layout>

        <div className='flex flex-col md:flex-row gap-3 mt-6'>
          
          <div className='md:p-3'>
            <Box className='md:bg-black rounded md:h-full md:w-[20vw] md:flex md:justify-center md:items-center'>
              <Typography variant='h4' component="div" className='gradient-text-home px-3' sx={{}}>
                {collection.title}. <span className='gradient-text' style={{}}>{tagLine()}</span>
              </Typography>            
            </Box>            
          </div>



          <div className='flex overflow-x-auto w-full py-3'>
            {collectionProducts.map((product) => {
              console.log(product);
              
              return <div key={product.node.id} className='px-3 '>
                <ProductCard goToProductPage={goToProductPage} product={product} />
              </div>
            })}
          </div>

        </div>

      </Layout>
    </Box>
  )
}


export const getStaticPaths = async () => {

  const collections = await shopifyClient.collection.fetchAll();
  const slugs = collections.map((c) => c.handle);

  const paths = slugs.map((category) => ({
    params: {category}
  }))

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { category } }) => {

  const products = await shopifyClient.product.fetchAll();

  const collection = await shopifyClient.collection.fetchByHandle(category);
  const collections = await shopifyClient.collection.fetchAll();

  const response = await callShopify(AllProducts)
  const products2 = response.data.products.edges


  const response2 = await callShopify(CollectionProducts, { category });
  const collectionProducts = response2.data.collection.products.edges
  console.log(collectionProducts)


  return {
    props: { products: parseShopifyResponse(products), collection: parseShopifyResponse(collection), collections: parseShopifyResponse(collections), products2, collectionProducts   },
    revalidate: 60,
  }

}

export default CategoryPage