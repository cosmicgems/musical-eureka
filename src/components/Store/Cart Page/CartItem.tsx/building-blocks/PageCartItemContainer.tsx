import React, { useState } from 'react'
import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import PageCartItemImage from './PageCartItemImage'
import PageCartItemInfo from './PageCartItemInfo'
import PageCartItemUpdateBtn from './PageCartItemUpdateBtn'
import PageCartItemPriceAndQuantityBar from './PageCartItemPriceAndQuantityBar'
import PageCartItemRemoveBtn from './PageCartItemRemoveBtn'

const PageCartItemContainer = ({product, index }) => {
  const [editCart, setEditCart] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(product.quantity);

  return (
    <Box key={product.id} sx={{bgcolor: index % 2 === 0 ? grey[100] : grey[300], boxShadow:{md: '5px 5px 7px 5px #bdbdbd'} }} className='flex flex-col gap-3 md:rounded'>
      
      <PageCartItemRemoveBtn
        product={product}
        editCart={editCart}
      />

      <div className='page-cart-item-info-row flex gap-3 items-center justify-between px-2 py-2'>
        <PageCartItemImage product={product} index={index} />
        <PageCartItemInfo product={product} />
        <PageCartItemUpdateBtn setEditCart={setEditCart} editCart={editCart}   />
      </div>

      <div>
        <PageCartItemPriceAndQuantityBar 
        product={product} 
        editCart={editCart} 
        quantity={quantity} 
        setQuantity={setQuantity} 
        />
      </div>

    </Box>
  )
}

export default PageCartItemContainer