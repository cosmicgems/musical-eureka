import React, { useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartItemsContainer = ({ children, cartItems, type, isEmpty  } : any) => {
    
    useEffect(() => {
        console.log(isEmpty);
        
    }, [ isEmpty, ])
    
    return (
        <div className='md:w-2/3 overflow-y-auto overflow-x-hidden  max-h-[50vh]  rounded'>

            {
                !isEmpty ?
                    <div className='flex flex-col md:gap-8  rounded md:px-3 py-3'>
                        { children }
                    </div>                    
                :
                <Box className="flex flex-col gap-8  rounded px-3 py-3 w-full items-center">
                    <Typography variant='body1' component="div" className=''>
                        Your cart is empty.
                    </Typography>
                    <ShoppingCartIcon />
                    <Button variant="outlined" href='/store/products'  >
                        Continue Shopping
                    </Button>                    
                </Box>

            }


        </div>
    )
}

export default CartItemsContainer