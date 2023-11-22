import React, { FC, useRef } from 'react'
import MarketingMessage from '../MarketingMessage'
import FeaturedProductsContainer from './FeaturedProductsContainer'
import Store from "../../css/Store.module.css"
import { grey } from '@mui/material/colors'
import ProductsList from '../../Products/ProductsList'
import { useApiProvider } from '@common'
import { Props } from 'html-react-parser/lib/attributes-to-props'
import { useAddItem } from '@common/cart'

const Hero: FC<Props>  = ({products, pro}) => {
  const addItem = useAddItem();

  const api = useApiProvider()
  // debugger

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
    
    
      <ProductsList pro={pro} products={products}/>
      
  

    </div>
  )
}

export default Hero