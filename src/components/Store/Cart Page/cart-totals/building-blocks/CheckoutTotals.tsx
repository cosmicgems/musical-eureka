import { Box, Button, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { USDollar } from 'helpers/usd'
import { useRouter } from 'next/router'
import React from 'react'

const CheckoutTotals = ({subtotal, discounts, session, handleOpen }) => {
    const router = useRouter();
    const discount = 0
    const shippingCost = 0
    const tax = 0.06
    const grandTotal = ((subtotal - discount) + shippingCost) + ((subtotal - discount) + shippingCost) * tax;
  
    return (
        <Box className="p-3 md:rounded" sx={{bgcolor: grey[900]}}>
            <div className='flex flex-col items-end gap-1 '>
                <div className='flex gap-1 '>
                <Typography variant='body1' sx={{color:grey[50]}} className='font-bold' component="div">
                    Cart Total:
                </Typography>
                <Typography variant='body1' sx={{}} className='gradient-text-four' component="div">
                    {USDollar.format(subtotal)}
                </Typography>
                </div>

                <div className='flex gap-1'>
                    <Typography variant='body1' sx={{color:grey[50]}} className='font-bold' component="div">
                        Discount:
                    </Typography>
                    <Typography variant='body1' sx={{}} className='gradient-text-four' component="div">
                        None
                    </Typography>
                </div>

                <div className='flex gap-1'>
                    <Typography variant='body1' sx={{color:grey[50]}} className='font-bold' component="div">
                        Sales Tax:
                    </Typography>
                    <Typography variant='body1' sx={{}} className='font-bold gradient-text-four' component="div">
                        {USDollar.format(subtotal * 0.06)}
                    </Typography>
                </div>

                <hr style={{ border: "1px solid #FFF", width:"100%" }} />
                <div className='flex gap-1'>
                    <Typography variant='h5' sx={{color:grey[50]}} className='font-bold' component="div">
                        Subtotal:
                    </Typography>
                    <Typography variant='h5' sx={{}} className='gradient-text-four' component="div">
                        { USDollar.format(grandTotal)}
                    </Typography>
                </div>                            
            </div>
            {
                grandTotal > 0 ?
                <div className='pt-3'>
                {
                    session?.user === undefined || session?.user === null ?
                    <Button onClick={()=> {}} size='large' sx={{color:grey[900]}} className='gradient-button' fullWidth variant='contained'>
                        Checkout
                    </Button> 
                    :
                    session?.user ?
                    <Button onClick={() => {router.push(`/api/store/checkout`)}} size='large' sx={{color:grey[900]}} className='gradient-button' fullWidth variant='contained'>
                        Checkout
                    </Button>       
                    :
                    null                         
                }

                </div>                          
            :
                null
            }


        </Box>
    )
}

export default CheckoutTotals