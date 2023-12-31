import React from 'react'
import { CheckoutTotals, OrderSummary } from './building-blocks'

const CartTotals = ({session, itemsCount, subtotal, discounts, handleOpen, }) => {
  return (
    <div className='flex flex-col md:gap-3 '>
        <OrderSummary session={session} itemsCount={itemsCount} />
        <CheckoutTotals 
        subtotal={subtotal} 
        discounts={discounts} 
        session={session} 
        handleOpen={handleOpen} />
    </div>
  )
}

export default CartTotals