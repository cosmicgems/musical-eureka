import React from 'react'
import MarketingMessage from '../MarketingMessage'
import FeaturedProductsContainer from './FeaturedProductsContainer'
import Store from "../../css/Store.module.css"
import { grey } from '@mui/material/colors'

const Hero = ({products}) => {

    const data = {
        title: "Featured Products",
        message: "Essentials for a lifestyle worth living.",
        titleColor: 'gradient-text', 
        bgColor: grey[900], 
        textColor: grey[50]
    }

  return (
    <div className='flex flex-col sm:flex-row sm:py-6'>

      <div className=' sm:max-w-1/4 flex justify-center items-center '>
          <MarketingMessage data={data} />
      </div>
    
      <FeaturedProductsContainer products={products} />
  

    </div>
  )
}

export default Hero