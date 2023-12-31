import { Typography } from '@mui/material'
import React from 'react'

const InventoryIndicator = ({stock}) => {
  return (
    <div className='inventory-indicator'>
        <Typography variant='caption' component="div" className=''>
            Stock
        </Typography>
        <Typography variant='caption' component="div" className=''>
            {stock}
        </Typography>
    </div>
  )
}

export default InventoryIndicator