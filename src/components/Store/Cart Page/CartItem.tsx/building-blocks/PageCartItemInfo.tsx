import { Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

const PageCartItemInfo = ({product}) => {
  return (
    <div className='flex flex-col w-full'>
                                    
      <Typography variant='body2' className='cart-page-item-truncate-text font-bold' sx={{}} component="div">
          {product.name}
      </Typography>
      <Typography variant='caption' className='truncate-text-cart-description' sx={{color:grey[900]}} component="div">
        {product.variant.product.description}
      </Typography>

    </div>
  )
}

export default PageCartItemInfo