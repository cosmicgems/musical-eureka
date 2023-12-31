import React from 'react'
import MainContainer from './ProductCard/MainContainer'

const ProductCard = ({goToProductPage, product, key}) => {
  return (
    <div className='w-full'>
      <MainContainer key={key} goToProductPage={goToProductPage} product={product} />
    </div>
    
  )
}

export default ProductCard