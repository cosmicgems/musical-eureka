import { Button, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { USDollar } from 'helpers/usd'
import React from 'react'

const CartTotals = ({data}) => {
    
    

  return (
    <div>
        <div className='flex  justify-between '>
            <Typography variant='body1' component="div" className='font-bold' sx={{color:grey[900]}} >
            Subtotal
            </Typography>
            <Typography variant='body1' component="div" className='font-bold' sx={{color:grey[900]}} >
            { USDollar.format(data?.lineItemsSubtotalPrice) }
            </Typography>
        </div>
        <div className='flex justify-between '>
            <Typography variant='body1' component="div" className='font-bold' sx={{color:grey[900]}} >
            Taxes
            </Typography>
            <Typography variant='body1' component="div" className='font-bold' sx={{color:grey[900]}} >
            Calculated at checkout
            </Typography>
        </div>
        <div className='flex justify-between '>
            <Typography variant='body1' component="div" className='font-bold' sx={{color:grey[900]}} >
            Estimated Shipping
            </Typography>
            <Typography variant='body1' component="div" className='font-bold' sx={{color:grey[900]}} >
            Free
            </Typography>
        </div>
        <div className='flex justify-between'>
            <Typography variant='body1' component="div" className='font-bold' sx={{color:grey[900]}} >
            Total
            </Typography>
            <Typography variant='body1' component="div" className='font-bold' sx={{color:grey[900]}} >
            { USDollar.format(data?.totalPrice) }
            </Typography>
        </div>
        <div className='w-full mt-3'>
            <Button href='/api/store/checkout' size='large' sx={{color:grey[900]}}  className='gradient-button ' fullWidth variant='contained'>
                Checkout
            </Button>
        </div>
    </div>
  )
}

export default CartTotals