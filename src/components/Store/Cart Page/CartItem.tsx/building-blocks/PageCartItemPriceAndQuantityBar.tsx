import React, { ChangeEvent, useState } from 'react'
import { Button, ButtonGroup, Typography } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { useStateContext } from 'Context/StateContext';
import { USDollar } from 'helpers/usd';
import { green, grey, red } from '@mui/material/colors';
import useRemoveItem from '@framework/cart/use-remove-item';
import { useUpdateItem } from '@common/cart';

const PageCartItemPriceAndQuantityBar = ({product, editCart, quantity, setQuantity}) => {

  const updateItem = useUpdateItem()

  const price = (product.variant.price! * product.quantity) || 0;

  const handleQuantityChange = async(val: number) => {
      
      if (Number.isInteger(val) && val >= 0) {
        setQuantity(val);
        
        const p = await updateItem({
          id: product.id,
          variantId: product.variantId, 
          quantity: val
        })

        console.log(p);
        
        
      }
  }

  const handleQuantity = async (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);

    handleQuantityChange(val);
  }

  const incrementQuantity = async (n = 1) => {
    console.log(` Quantity: ${quantity}`);
    
    const  val = Number(quantity) + n

    console.log(` val : ${val}`);

    handleQuantityChange(val);

  }


  return (
    <div className='flex  justify-between px-3 pb-3'>
        <div className='flex gap-2'>
        <Typography variant='caption' className='font-bold' sx={{}} component="div">
            Price:
        </Typography>    
        <Typography variant='caption' className='' sx={{}} component="div">
            {USDollar.format(product.variant?.price)}
        </Typography>                               
        </div>
        {
          editCart ?
            <div className='flex'>

              <ButtonGroup sx={{borderColor:grey[900], boxShadow:'2px 2px 4px 2px #bdbdbd'}}>

                <Button onClick={(e) =>{ e.stopPropagation();incrementQuantity(-1)}} disableElevation sx={{borderColor:grey[900], bgcolor:grey[900]}} variant='contained'>
                  <RemoveCircleOutlineRoundedIcon sx={{color:red[600]}} />
                </Button>

                <Button sx={{borderColor:grey[900]}}>    
                  <Typography variant='caption' className='' sx={{}} component="div">
                      {product.quantity}
                  </Typography> 
                </Button>

                <Button onClick={(e) =>{ e.stopPropagation();incrementQuantity(+1)}} disableElevation sx={{borderColor:grey[900], bgcolor:grey[900]}} variant='contained'>
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
                  {product.quantity}
              </Typography>                               
            </div>                                  
        }

        <div className='flex gap-2'>
          <Typography variant='caption' className='font-bold' sx={{}} component="div">
              Item Total:
          </Typography>    
          <Typography variant='caption' className='' sx={{}} component="div">
              {USDollar.format(price)}
          </Typography>                               
        </div>
    
    </div>
  )
}

export default PageCartItemPriceAndQuantityBar