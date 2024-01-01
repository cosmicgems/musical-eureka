import React from 'react'
import MainContainer from './ProductCard/MainContainer'

const ProductCard = ({goToProductPage, product}) => {
  return (
    <div className='w-full'>
      <MainContainer  goToProductPage={goToProductPage} product={product} />
    </div>
    
  )
}

export default ProductCard