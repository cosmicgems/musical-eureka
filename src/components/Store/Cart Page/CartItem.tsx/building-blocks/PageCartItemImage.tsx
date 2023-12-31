import { LineItem } from '@common/types/cart'
import { CardMedia } from '@mui/material'
import React from 'react'

const PageCartItemImage = ({product, index}: {product: LineItem, index: number}) => {
  return (
    
    <CardMedia 
    component="img"
    src={product?.variant?.image?.url}
    alt={product?.variant?.product?.description}
    className='object-cover w-[12.5%] rounded'
    sx={{boxShadow: index % 2 === 0 ? '5px 5px 7px 5px #bdbdbd' : '5px 5px 7px 5px #bdbdbd',}}
    />
  
  )
}

export default PageCartItemImage