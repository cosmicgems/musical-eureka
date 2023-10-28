import { Box, Typography } from '@mui/material'
import { AiOutlinePlus, AiOutlineMinus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import React, { useRef } from 'react'
import { useStateContext } from '../../../../Context/StateContext'

const Cart = () => {
    const cartRef =useRef();
    const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove} = useStateContext();
    console.log(cartItems);
    let USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
  });
    
  return (
    <div className='cart-wrapper' ref={cartRef}>
        <Box className="min-h-[25vh] cart-container">
        <button type='button' className='cart-heading' onClick={ ()=> {setShowCart(false)}}> 
          <AiOutlineLeft /> 
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities}) items</span>
        </button>

            <div className='flex flex-col gap-6'>

                <Typography variant='h3' component="div" className='mt-3'>
                    Cart
                </Typography>

                <div className="flex flex-col gap-3">
                  <div className='product-container'>
                    {cartItems.length >= 1 && cartItems.map((item, i) => (
                      <div key={item._id} className='product'>
                        {/* <img src={urlFor(item?.image[0])} className='cart-product-image'/> */}
                        <div className='item-desc'>
                          <div className='flex top'>
                            <h5>{item.title}</h5>
                            <h4>{USDollar.format(item.variants[0].price.amount)}</h4>
                          </div>
                          <div className='flex bottom'>
                            <div>
                              <p className='quantity-desc'>
                                <span className='minus' onClick={() => toggleCartItemQuantity(item._id, 'dec')}>
                                      <AiOutlineMinus />
                                  </span>
                                  <span className='num' >
                                      {item.quantity}
                                  </span>
                                  <span className='plus'  onClick={() => toggleCartItemQuantity(item._id, 'inc')}>
                                      <AiOutlinePlus />
                                </span>
                              </p>
                            </div>
                            <button 
                            type='button'
                            className='remove-item'
                            onClick={() => onRemove(item)}>
                              <TiDeleteOutline/>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

            </div>

        </Box>
    </div>
  )
}

export default Cart