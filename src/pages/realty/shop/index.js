import React from 'react'
import { client } from '../../../../lib/client'
import Product from '../../../components/technology/store/Product'
import FooterBanner from '../../../components/technology/store/FooterBanner'
import HeroBanner from '../../../components/technology/store/HeroBanner'
import Layout from '../../../components/Layout'

const Home = ({ products, bannerData}) => {
  console.log(bannerData);
  return (
    <>
    <div>
 
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>


      <div className='products-heading'>
        <h2>SHOWROOM</h2>
        <p>Indulge in style.</p>
      </div>
        <div className='products-container'>
          {products?.map((product) => <Product key={product._id} product={product} />)}
        </div>
      

     

 <FooterBanner footerBanner={bannerData && bannerData[0]} />      
 
    </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);
  console.log(products);
  return {
    props: { products, bannerData }
  }
}

export default Home