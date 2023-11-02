import { Box, Button, ButtonGroup, TextField, Typography } from '@mui/material'
import { AiOutlinePlus, AiOutlineMinus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import React, { useRef, useState } from 'react'
import { useStateContext } from '../../../../Context/StateContext'
import { grey } from '@mui/material/colors'

const Cart = () => {
    const cartRef =useRef();
    const { totalPrice, cartTotal, totalQuantities, cartItems, setShowCart, showCart, toggleCartItemQuantity, onRemove} = useStateContext();


    console.log(cartItems);

    let USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
  });

  const handleShowCart = () => {
    setShowCart(!showCart)
  }
    
  return (
    <div onClick={()=>{handleShowCart()}} className='cart-wrapper' ref={cartRef}>
        <Box className="h-full cart-container">
        <button type='button' className='cart-heading' onClick={ (e)=> {e.stopPropagation();setShowCart(false)}}> 
          <AiOutlineLeft /> 
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities}) items</span>
        </button>

            <div className='flex flex-col gap-3 h-full'>

                <Typography variant='h3' component="div" className='mt-3 gradient-text-home'>
                    Cart
                </Typography>

                <div className="flex flex-col gap-3 h-[100%]">
                  <div className='product-container h-full'>
                    {cartItems.length >= 1 && cartItems.map((item, i) => (
                      <div key={item.id} className='product'>
                        <img src={item?.node.images.edges[0].node.url} className='cart-product-image'/>
                        <div className='item-desc'>
                          <div className='flex top'>
                            <h5>{item.node.title}</h5>
                            <h4>{USDollar.format(item.node.priceRange.maxVariantPrice.amount)}</h4>
                          </div>
                          <div className='flex bottom w-full '>
                            <div className=' flex justify-between '>
                                <ButtonGroup>
                                  <Button variant='outlined' className='minus' onClick={(e) =>{ e.stopPropagation();toggleCartItemQuantity(item.node.id, 'dec')}}>
                                      <AiOutlineMinus />
                                  </Button>
                                  <Button  className='num' >
                                      {item.quantity}
                                  </Button>
                                  <Button variant='outlined' className='plus'  onClick={(e) => {e.stopPropagation();toggleCartItemQuantity(item.node.id, 'inc')}}>
                                      <AiOutlinePlus />
                                  </Button>                                  
                                </ButtonGroup>

                                <div className=' h-full'>
                                  <Typography variant='h6' sx={{color:grey[900]}} className='font-bold' component="div">{USDollar.format(item.node.priceRange.maxVariantPrice.amount * item.quantity)}</Typography>
                                </div>
                              <button 
                              type='button'
                              className='remove-item'
                              onClick={(e) => {e.stopPropagation() ;onRemove(item)}}>
                                <TiDeleteOutline/>
                              </button>

                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className='flex justify-end w-full pr-3'>
                      <div className='flex gap-3'>
                        <Typography variant='h5' component="div" className='font-bold' sx={{color:grey[900]}} >
                          Total
                        </Typography>
                        <Typography variant='h5' component="div" className='gradient-text-four' sx={{}} >
                          { USDollar.format(cartTotal) }
                        </Typography>
                      </div>
                </div>
            </div>

        </Box>
    </div>
  )
}

export default Cart