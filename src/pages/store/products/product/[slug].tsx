import React, { useRef, useState } from 'react'
import { Layout } from '@components/big-three-components';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { getAllProductsPaths, getProduct, getAllProducts } from '@framework/product';
import { getConfig } from '@framework/api/config';
import { ProductView } from '@components/Store/Products/RefactoredComponents/products';
import useCart from '@framework/cart/use-cart'
import { getSession, useSession } from 'next-auth/react';
import { Session } from 'src/utility/types/Session';
import axios from 'axios';



const ProductPage = ({product}) => {
  console.log(product);
  
  const [addedToRecent, setAddedToRecent] = useState<boolean>(false)
  
  const router = useRouter();
  const { data: session, status } = useSession() as Session;

  const [quantity, setQuantity] = useState<number>(1);

  const [photo, setPhoto] = useState<number>(0)

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

  const recentlyViewedItem = {
    price: product.price.value,
    name: product.name,
    image: product.images[0].url,
    shopifyId: product.id ,
    path: `/store/products/product${product.path}`,
    desc: product.description,
    qty: 1,
}

console.log(recentlyViewedItem);


  const handleRecentlyViewed = async () => {
    const res = await axios.put(`/api/store/user/recently-viewed?userId=${session?.user._id}&productId=${product.id}`, {recentlyViewedItem})
    console.log(res.data.message);
    
  }

  if(session){
    if(!addedToRecent) {
      setAddedToRecent(true)
      handleRecentlyViewed()
    }
  } else {
    
  }

  return (
    <Box className="">
    
      <Layout>
{ product && <ProductView product={product} userId={session?.user._id} />}


      </Layout>      
    </Box>

  )
}






export const getStaticPaths: GetStaticPaths = async () => {

  const config = getConfig();
  const { products } = await getAllProductsPaths(config);



  return {
    paths: products.map(p => ({params: {slug: p.slug}})) ,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ 
  params
}, ctx
  ) => {
console.log(params, ": params");




  const config = getConfig();
  const { product } = await getProduct({
    config, variables: { slug: params?.slug}
  });

// console.log(product);

  

  return {
    props: { product },
    revalidate: 60,
  }

}

export default ProductPage