import { Box, Typography } from '@mui/material'
import { AiOutlineLeft, } from 'react-icons/ai'
import React, { useRef, } from 'react'
import { useStateContext } from '../../../../Context/StateContext'
import useCart from '@common/cart/use-cart'
import { LineItem } from '@common/types/cart'
import CartItem from './CartItem'
import CartTotals from './CartTotals'

const Cart = () => {
    const { data, isEmpty } = useCart();
  
    
    
  const itemsCount = data?.lineItems.reduce((count, item) => {
    return count + item.quantity
  }, 0) ?? 0
    
    
    const cartRef =useRef();
    const { setShowCart, showCart, } = useStateContext();


  const handleShowCart = () => {
    setShowCart(!showCart)
  }
    
  return (
    <div onClick={()=>{handleShowCart()}} className='cart-wrapper' ref={cartRef}>
        <Box className="h-full cart-container">
        <button type='button' className='cart-heading' onClick={ (e)=> {e.stopPropagation();setShowCart(false)}}> 
          <AiOutlineLeft /> 
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({itemsCount}) items</span>
        </button>

            <div className='flex flex-col gap-3 h-full'>
              <div>
                  <Typography variant='h3' component="div" className='mt-3 gradient-text-home'>
                      Cart
                  </Typography>                
              </div>


                <div className='flex flex-col h-full  '>

                  <div className=" h-3/5 overflow-y-auto" >
                    {data?.lineItems.map((item: LineItem ) =>
                    <div key={item.id}>
                      <CartItem item={item} currencyCode={data.currency.code} />
                    </div>
                    )}
                  </div>

                  <div className='flex flex-col h-1/5 pt-6'>
                        <CartTotals data={data} />
                  </div>

                </div>

                
            </div>

        </Box>
    </div>
  )
}

export default Cart 