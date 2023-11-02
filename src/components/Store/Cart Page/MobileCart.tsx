import { Box, Button, CardMedia, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react'
import { useStateContext } from '../../../../Context/StateContext';
import { USDollar } from '../../../../helpers/usd';


const MobileCart = () => {

    const { cartItems, cartTotal } = useStateContext();

    return (
        <div className='mt-6 flex flex-col gap-3'>
        <div className='px-3'>
            <Typography className='gradient-text-home' variant='h4' component="div" sx={{}}>
            Shopping Cart
            </Typography>            
        </div>


        <div>
            {
            cartItems.length > 0 ?
            <div className='flex flex-col '>
                {cartItems.map((item, i) => {
                console.log(item);
                
                return (
                    <Box key={item.node.id} sx={{bgcolor: i % 2 === 0 ? grey[50] : grey[200] }} className='flex flex-col gap-2 p-3'>
                        <div className='flex gap-3'>
                            <CardMedia 
                            component="img"
                            image={item.node.images.edges[0].node.url}
                            alt={item.node.description}
                            className='w-1/4 rounded'
                            sx={{boxShadow: '5px 5px 7px 5px #dedede',}}
                            />

                            <div className='flex flex-col w-1/2'>
                            <Typography variant='body1' className='truncate-text' sx={{}} component="div">
                                {item.node.title}
                            </Typography>

                            </div>

                            <Button className='w-1/4'>
                            Change
                            </Button>

                        </div>
                        <div className='flex  justify-between'>
                            <div className='flex gap-2'>
                            <Typography variant='caption' className='font-bold' sx={{}} component="div">
                                Price:
                            </Typography>    
                            <Typography variant='caption' className='' sx={{}} component="div">
                                {USDollar.format(item.node.priceRange.maxVariantPrice.amount)}
                            </Typography>                               
                            </div>
                            <div className='flex gap-2'>
                            <Typography variant='caption' className='font-bold' sx={{}} component="div">
                                Quantity:
                            </Typography>    
                            <Typography variant='caption' className='' sx={{}} component="div">
                                {item.quantity}
                            </Typography>                               
                            </div>
                            <div className='flex gap-2'>
                            <Typography variant='caption' className='font-bold' sx={{}} component="div">
                                Item Total:
                            </Typography>    
                            <Typography variant='caption' className='' sx={{}} component="div">
                                {USDollar.format(item.quantity * item.node.priceRange.maxVariantPrice.amount)}
                            </Typography>                               
                            </div>
                        
                        </div>   
                    </Box>
                
                )
                })}

                <div className='flex flex-col gap-1 items-end px-3 mt-3'>

                    <div className='flex gap-1 '>
                    <Typography variant='body1' sx={{}} className='font-bold' component="div">
                        Subtotal:
                    </Typography>
                    <Typography variant='body1' sx={{}} className='gradient-text-four' component="div">
                        {USDollar.format(cartTotal)}
                    </Typography>
                    </div>

                    <div className='flex gap-1'>
                    <Typography variant='body1' sx={{}} className='font-bold' component="div">
                        Shipping Cost:
                    </Typography>
                    <Typography variant='body1' sx={{}} className='gradient-text-four' component="div">
                        FREE
                    </Typography>
                    </div>

                    <div className='flex gap-1'>
                        <Typography variant='body1' sx={{}} className='font-bold' component="div">
                            Sales Tax:
                        </Typography>
                        <Typography variant='body1' sx={{}} className='' component="div">
                            {USDollar.format(cartTotal * 0.06)}
                        </Typography>
                    </div>

                    <div className='flex gap-1'>
                        <Typography variant='h5' sx={{}} className='font-bold' component="div">
                            Grand Total:
                        </Typography>
                        <Typography variant='h5' sx={{}} className='gradient-text-four' component="div">
                            { USDollar.format(cartTotal + (cartTotal * 0.06))}
                        </Typography>
                    </div>

                </div>
                <div className='px-3 mt-3'>
                    <Button size='large' sx={{color:grey[900]}} className='gradient-button' fullWidth variant='contained'>
                        Checkout
                    </Button>
                </div>

            </div>
            :
            <Typography variant='body1' component="div" className='gradient-text-three' sx={{}}>
                Your Cart Is Empty
            </Typography>
            }
        </div>



        </div>
    )
}

export default MobileCart