import React from 'react'
import { AiOutlineShopping } from 'react-icons/ai'

const CartBtn = ({itemsCount, setShowCart}) => {

    return (

        <button 
        type='button'
        className='cart-icon' 
        style={
            {
                marginInline:'1vw', 
                justifyContent: 'center', 
                alignItems:'center'
            }
        } 
        onClick={() =>{setShowCart(true)}}
        >

            <AiOutlineShopping/>

            <span className='cart-item-qty'>{itemsCount}</span>
        
        </button>  

    )

}

export default CartBtn