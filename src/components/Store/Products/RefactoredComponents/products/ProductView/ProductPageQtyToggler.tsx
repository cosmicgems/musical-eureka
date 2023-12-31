import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, ButtonGroup, TextField } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import useRemoveItem from '@framework/cart/use-remove-item';
import useUpdateItem from '@framework/cart/use-update-item';
import { LineItem } from '@common/types/cart'
import useAddItem from '@framework/cart/use-add-item'
import useCart from '@framework/cart/use-cart';
import { toast } from 'react-hot-toast'

import { Product } from '@common/types/product';
import { getVariant, Choices } from '@components/Store/Products/helpers';

const ProductPageQtyToggler = ({item, product, choices}: {item: LineItem, product: Product, choices: Choices,}) => {
  
  const [quantity, setQuantity] = useState(item.quantity)
  const variant = getVariant(product, choices);
  
  useEffect(()=> {
    console.log(variant);
    
  }, [variant])

  const { data, isEmpty } = useCart();
  
  const cartItem = data?.lineItems.filter((t) => t.id === item.productId )
  
  const removeItem = useRemoveItem()
  const updateItem = useUpdateItem()
  const addItem = useAddItem()
  

  const handleQuantityChange = async (val: number) => {
    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val);
  
      try {
        const updatedCartItem = await updateItem({
          id: product.id,
          variantId: variant?.id,
          quantity: Number(val),
        });
  
        console.log(updatedCartItem); // This will log the updated cart item after the quantity change.
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    }
  };

  const handleQuantity = async (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);

    handleQuantityChange(val);
  }

  const incrementQuantity = (n = 1) => {
    const  val = Number(quantity) + n
    console.log(val);
    
    handleQuantityChange(val);

  }

    
  const addToCart = async () => {

    try {
      const i = {
        productId: String(product.id),
        variantId: String(variant?.id),
        quantity: 15
      }

      // console.log(product.id, "948983848", i.variantId);
      


      const output = await addItem(i)
      console.log(output);
      const addedItemFilter = output.lineItems.filter(lineItem => lineItem.variantId === item.variantId )
      const addedItem = addedItemFilter[0]
      
      toast.success(`${item.quantity} ${addedItem.name} added to the cart.`);
      
    } catch (error) {
      console.log(`error: ${error}`);
      
    }
  }

  return (
    <div className='product-qty-toggler-container'>

      <div className='product-page-add-to-cart-btn-container'>
          <Button onClick={addToCart} variant='contained' fullWidth>
              Add to Cart
          </Button>
      </div>

    </div>
  )
}

export default ProductPageQtyToggler