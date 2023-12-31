import React from 'react'
import { PageCartItemContainer } from './building-blocks'

const PageCartItem = ({product, index, key}) => {
  return (
    <div key={key}>
      <PageCartItemContainer product={product} index={index} />
    </div>
    
  )
}

export default PageCartItem