import { Product } from '@common/types/product'
import { CardMedia } from '@mui/material'
import React, { FC } from 'react'


interface Props {
    product: Product
}
  
  
const ProductHero: FC<Props> = ({ product }) => {

  return (
    <div className='product-hero-container'>
        <CardMedia 
            component="img"
            image={product.images[0].url}
            alt={product.name}
            className=' product-hero-image'
        />
    </div>
  )
}

export default ProductHero