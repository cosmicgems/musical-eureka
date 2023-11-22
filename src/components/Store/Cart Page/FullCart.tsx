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
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import CheckoutComponent from './CheckoutComponent';


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
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false); setLoggingIn(!loggingIn)};
  const handleStartCheckout = () => setOpen(true);
  const handleCloseCheckout = () => setOpen(false);
  const [isLoading, seIsLoading] = useState<boolean>(false);

  const {data:session, status} = useSession() as Session;


  const { cartItems, cartTotal, discount, setDiscount, shippingCost, totalQuantities, setShippingCost, tax, setTax, onRemove, toggleCartItemQuantity } = useStateContext();
  const [applyDiscount, setApplyDiscount] = useState<boolean>(false);
  const [editCart, setEditCart] = useState<boolean>(false);
  const [guestCheckout, setGuestCheckout] = useState<boolean>(false);
  const [memberCheckout, setMemberCheckout] = useState<boolean>(false);
  const [checkingOut, setCheckingOut] = useState<boolean>(false)
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const [signingUp, setSigningUp] = useState<boolean>(null);
  const [login, setLogin] = useState<boolean>(true);
  const [signup, setSignup] = useState<boolean>(false);
  
  const grandTotal = ((cartTotal - discount) + shippingCost) + ((cartTotal - discount) + shippingCost) * tax;

  return (
    <>
      {
        !openCheckout ? 
          <div className='flex flex-col gap-3 mt-6 overflow-y-hidden px-20 w-full'>

            <div className='px-3'>
              <Typography variant='h4' className='gradient-text-home' sx={{}} component="div">
                Shopping Cart
              </Typography>            
            </div>


            <div className='flex gap-3 w-full pl-3 '>

              <div className='w-2/3 overflow-y-auto overflow-x-hidden  max-h-[50vh]  rounded'>
                              {
                  cartItems?.length > 0 ?
                  <div className='flex flex-col gap-8  rounded px-3 py-3'>
                      {cartItems.map((item, i) => {
                      console.log(item);
                      
                      return (
                          <Box key={item.node.id} sx={{bgcolor: i % 2 === 0 ? grey[100] : grey[300], boxShadow:'5px 5px 7px 5px #bdbdbd' }} className='flex flex-col gap-3 rounded'>
                              
                                <div className='relative flex justify-end rounded'>

                                  <motion.span whileHover={{scale:1.5}} className='rounded' onClick={(e)=> {e.preventDefault();onRemove(item)}}>
                                    <HighlightOffRoundedIcon sx={{fontSize: '2rem', color: red[500]}} className='absolute p-1 rounded right-[-20px] top-[-20px]' />
                                  </motion.span>
                                  
                                </div> 
                                <div className='flex gap-3 items-center justify-between px-2 pb-2'>
                                  <CardMedia 
                                  component="img"
                                  image={item.node.images.edges[0].node.url}
                                  alt={item.node.description}
                                  className='w-[20vh] rounded object-cover h-[20vh]'
                                  sx={{boxShadow: i % 2 === 0 ? '5px 5px 7px 5px #bdbdbd' : '5px 5px 7px 5px #bdbdbd',}}
                                  />

                                  <div className='flex flex-col w-1/2'>
                                    
                                    <Typography variant='body1' className='truncate-text font-bold' sx={{}} component="div">
                                        {item.node.title}
                                    </Typography>
                                    <Typography variant='body2' className='truncate-text-cart-description' sx={{color:grey[900]}} component="div">
                                      {item.node.description}
                                    </Typography>

                                  </div>

                                  {
                                    editCart ?
                                    <Button className='w-1/5' onClick={(e)=> {e.preventDefault(); setEditCart(!editCart)}}>
                                    Done
                                    </Button>    
                                    :
                                    <Button className='w-1/5' onClick={(e)=> {e.preventDefault(); setEditCart(!editCart)}}>
                                    Change
                                    </Button>                                  
                                  }


                              </div>
                              <div className='flex  justify-between px-3 pb-3'>
                                  <div className='flex gap-2'>
                                  <Typography variant='caption' className='font-bold' sx={{}} component="div">
                                      Price:
                                  </Typography>    
                                  <Typography variant='caption' className='' sx={{}} component="div">
                                      {USDollar.format(item.node.priceRange.maxVariantPrice.amount)}
                                  </Typography>                               
                                  </div>
                                  {
                                    editCart ?
                                      <div className='flex'>
                                        <ButtonGroup sx={{borderColor:grey[900], boxShadow:'2px 2px 4px 2px #bdbdbd'}}>
                                          <Button onClick={(e) =>{ e.stopPropagation();toggleCartItemQuantity(item.node.id, 'dec')}} disableElevation sx={{borderColor:grey[900], bgcolor:grey[900]}} variant='contained'>
                                            <RemoveCircleOutlineRoundedIcon sx={{color:red[600]}} />
                                          </Button>
                                          <Button sx={{borderColor:grey[900]}}>    
                                            <Typography variant='caption' className='' sx={{}} component="div">
                                                {item.quantity}
                                            </Typography> 
                                          </Button>
                                          <Button onClick={(e) =>{ e.stopPropagation();toggleCartItemQuantity(item.node.id, 'inc')}} disableElevation sx={{borderColor:grey[900], bgcolor:grey[900]}} variant='contained'>
                                            <AddCircleOutlineRoundedIcon sx={{color: green[600]}} />
                                          </Button>
                                        </ButtonGroup>
                                      </div>
                                    :
                                      <div className='flex gap-2'>
                                        <Typography variant='caption' className='font-bold' sx={{}} component="div">
                                            Quantity:
                                        </Typography>    
                                        <Typography variant='caption' className='' sx={{}} component="div">
                                            {item.quantity}
                                        </Typography>                               
                                      </div>                                  
                                  }

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
                    </div>
                      :
                      <Box className="flex flex-col gap-8  rounded px-3 py-3 w-full">
                        <Typography variant='h4' component="div" className='gradient-text-three w-full text-center' sx={{}}>
                          Your cart is empty.
                        </Typography>
                      </Box>
                  }
              </div>

              <div className='w-1/3'>
                
                <div>

                  <div className='flex flex-col gap-3 '>

                    <Box className="px-3 py-1 rounded flex gap-3" sx={{bgcolor: grey[900]}}>
                      <div className='flex gap-1'>
                        <Typography variant='body1' component="div" className='gradient-text' sx={{}}>
                          Member:
                        </Typography>
                          {
                            session?.user !== null && session?.user !== undefined ?
                              <div>
                                <Typography variant='body1' component="div" className='font-bold' sx={{color:grey[50]}}>
                                  {session?.user.first_name} {session?.user.last_name}
                                </Typography>
                              </div>
                            :
                            <Typography variant='body1' component="div" className='gradient-text-three' sx={{color:grey[50]}}>
                              Not signed in
                            </Typography>
                          }
                      </div>
                      <div className='flex gap-1'>
                        <Typography variant='body1' component="div" className='gradient-text' sx={{}}>
                          Items in Cart:
                        </Typography>
                        <Typography variant='body1' component="div" className='font-bold' sx={{color:grey[50]}}>
                          {totalQuantities}
                        </Typography>
                      </div>
                    </Box>

                      <Box className="p-3 rounded" sx={{bgcolor: grey[900]}}>
                          <div className='flex flex-col items-end gap-1 '>
                              <div className='flex gap-1 '>
                              <Typography variant='body1' sx={{color:grey[50]}} className='font-bold' component="div">
                                  Cart Total:
                              </Typography>
                              <Typography variant='body1' sx={{}} className='gradient-text-four' component="div">
                                  {USDollar.format(cartTotal)}
                              </Typography>
                              </div>

                              <div className='flex gap-1'>
                                  <Typography variant='body1' sx={{color:grey[50]}} className='font-bold' component="div">
                                      Discount:
                                  </Typography>
                                  <Typography variant='body1' sx={{}} className='gradient-text-four' component="div">
                                      {
                                          applyDiscount ?
                                          - USDollar.format(discount)
                                          :
                                          "NONE"
                                      }
                                  </Typography>
                              </div>

                              <div className='flex gap-1'>
                                  <Typography variant='body1' sx={{color:grey[50]}} className='font-bold' component="div">
                                      Sales Tax:
                                  </Typography>
                                  <Typography variant='body1' sx={{}} className='font-bold gradient-text-four' component="div">
                                      {USDollar.format(cartTotal * 0.06)}
                                  </Typography>
                              </div>

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
                            grandTotal !== 0 ?
                              <div className='pt-3'>
                                {
                                  session?.user === undefined || session?.user === null ?
                                  <Button onClick={handleStartCheckout} size='large' sx={{color:grey[900]}} className='gradient-button' fullWidth variant='contained'>
                                      Checkout
                                  </Button> 
                                  :
                                  session?.user ?
                                  <Button onClick={()=>{setCheckingOut(!checkingOut); setMemberCheckout(!memberCheckout); setOpenCheckout(!openCheckout)}} size='large' sx={{color:grey[900]}} className='gradient-button' fullWidth variant='contained'>
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


                  </div>

                </div>

              </div>

            </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <>
            {
              !loggingIn && !checkingOut && !signingUp && session?.user === undefined ?
                <Box sx={style} className="rounded flex flex-col gap-3">
                  <Typography id="modal-modal-title" variant="h4" className='gradient-text text-center' component="h2" sx={{}}>
                    Get Rewarded?
                  </Typography>
                  <Typography id="modal-modal-description"  sx={{ mt: 2, color:grey[50] }}>
                    Get Free Shipping and other rewards when you join <span className='gradient-text'>Pearl Box</span>.
                  </Typography>
                  <ButtonGroup variant='text' className='w-full'>
                    <Button className='gradient-text-three w-full' onClick={()=>{setGuestCheckout(true); setCheckingOut(true)}} sx={{borderColor: grey[50]}}>
                      Continue as Guest
                    </Button>
                    <Button className='gradient-text-four w-full' onClick={()=>{setLoggingIn(!loggingIn)}}  sx={{borderColor: grey[50]}}>
                      Log In to Account
                    </Button>
                  </ButtonGroup>
                </Box>
              :
              loggingIn && !signingUp && !checkingOut && session?.user === undefined?
              <>
              {
                login && !signup ?
                <Box sx={style} className="rounded flex flex-col gap-1">
                  <LoginModal handleSetLogin={()=>{setLogin(!login); setSignup(!signup)}} handleLogin={()=>{setMemberCheckout(true), setLoggingIn(!loggingIn); setCheckingOut(!checkingOut)}} />
                </Box>   
                :
                !login && signup ?
                <Box sx={style} className="rounded flex flex-col gap-1">
                  <SignupModal handleSetSignup={()=>{setLogin(!login); setSignup(!signup)}} />
                </Box>   
                :
                null
              }
          
              </>

            : 
            checkingOut ?
            <Box sx={style} className="rounded flex flex-col gap-3">
              <CheckoutComponent cartItems={cartItems} guestCheckout={guestCheckout} memberCheckout={memberCheckout} />
            </Box>
            :
            null
            }          
          </>


        </Modal>


          </div> 
        :
        checkingOut  ?
          <div className='flex justify-center items-center w-full'>
            <CheckoutComponent guestCheckout={guestCheckout} memberCheckout={memberCheckout} cartItems={cartItems} />
          </div>
          :
          null
      }
   
    </>

  )
}

export default FullCart