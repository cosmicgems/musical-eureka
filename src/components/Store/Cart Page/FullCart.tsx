import { Box, Button, ButtonGroup, CardMedia, Typography } from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import React, { useState } from 'react'
import { useStateContext } from '../../../../Context/StateContext';
import { USDollar } from '../../../../helpers/usd';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import {motion} from "framer-motion"
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { useSession } from 'next-auth/react';
import Modal from '@mui/material/Modal';
import LoginModal from './auth-modal/building-blocks/LoginModal';
import SignupModal from './auth-modal/building-blocks/SignupModal';
import CheckoutComponent from './CheckoutComponent';
import useCart from '@common/cart/use-cart';
import { LineItem } from '@common/types/cart';
import { PageCartItem } from './CartItem.tsx';
import { CartItemsContainer } from './CartItemsContainer.tsx';
import { CartTotals } from './cart-totals';
import { PageAuthModal } from './auth-modal';


interface Session {
  data:{
      user:{
          about: string;
          confirmed_account: boolean;
          createdAt: Date;
          email: string;
          first_name: string;
          last_name: string;
          password: string;
          photo: string;
          role: number;
          updatedAt: Date;
          username: string;
          verification_token: string;
          verification_token_expiration: string;
          _id: string;
          
      }      
  },
  status: string;

}


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: grey[900],
  boxShadow: 24,
  p: 4,
};


const FullCart = () => {
  const [open, setOpen] = React.useState(false);
  const [openCheckout, setOpenCheckout] = React.useState(false);
  const handleOpen = () => {setOpen(true); };

  const {data:session, status} = useSession() as Session;
  const { data, isEmpty, isLoading, isValidating } = useCart()
  console.log(data);

  const itemsCount = data?.lineItems.reduce((count, item) => {
    return count + item.quantity
  }, 0) ?? 0

  const cartItems = data?.lineItems ;
  const discounts = data?.discounts
  const subtotal = data?.lineItemsSubtotalPrice
  const tax = 0.06;





  return (
    <>
      {
        !openCheckout ? 
          <div className='flex flex-col gap-3 mt-6 md:overflow-y-hidden md:px-20 w-full'>

            <div className='px-3'>
              <Typography variant='h4' className='gradient-text-home' sx={{}} component="div">
                Shopping Cart
              </Typography>            
            </div>


            <div className='flex flex-col md:flex-row gap-3 w-full md:pl-3 '>

              <CartItemsContainer cartItems={cartItems} isEmpty={isEmpty} >
                      {cartItems?.map((item: LineItem, i: number)=> {
                        return (
                          <>
                            <PageCartItem product={item} index={i} key={item.id} />
                          </>
                        )
                      })}
              </CartItemsContainer>



              <div className='md:w-1/3 flex flex-col'>
                <CartTotals 
                session={session} 
                itemsCount={Number(itemsCount)} 
                discounts={discounts} 
                subtotal={subtotal} 
                handleOpen={handleOpen} 
                />
              </div>

            </div>
        
            <PageAuthModal 
            cartItems={cartItems} 
            session={session} 
            open={open} 
            setOpen={setOpen}
            />


          </div> 
        :
        null
      }
   
    </>

  )
}

export default FullCart