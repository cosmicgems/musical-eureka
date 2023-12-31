import { Product } from '@common/types/product'
import { Choices, getVariant } from '@components/Store/Products/helpers'
import { Typography } from '@mui/material'
import React, { FC, useState } from 'react'
import { ProductHero, ProductDetails, ProductSlider } from "@components/Store/Products/RefactoredComponents/products/ProductView"
import useAddItem from "@framework/cart/use-add-item"
import useCart from "@common/cart/use-cart"
import { toast } from 'react-hot-toast'


interface Props {
  product: Product
  userId: any
}


const ProductView: FC<Props> = ({ product, userId }) => {
  const { data, isEmpty } = useCart();


  const [ choices, setChoices ] = useState<Choices>({})
  const addItem = useAddItem()

  const variant = getVariant(product, choices);
  
  const [quantity, setQuantity] = useState<number>(1);

  // console.log(choices);
  

  const addToCart = async () => {
    
    try {
      const item = {
        productId: String(product.id),
        variantId: String(variant?.id),
        variantOptions: variant?.options,
        quantity: quantity
      }

      console.log(item.variantId, variant?.id, variant?.options);
      


      const output = await addItem(item)
      const addedItemFilter = output.lineItems.filter(lineItem => lineItem.variantId === item.variantId )
      const addedItem = addedItemFilter[0]
      console.log(addedItem,);
      
      toast.success(`${item.quantity} ${addedItem.name} added to the cart.`);
      
    } catch (error) {
      
    }
  }

  
  const item = {
    productId: String(product.id),
    variantId: String(variant?.id),
    variantOptions: variant?.options,
    quantity: quantity
  }



// console.log(variant);

  return (
    <div className='product-view-container'>

      <div className='product-view-wrapper'>

        <div className='product-container-wrapper'>
          
          <Typography variant='h3' component="div" className='gradient-text'>
            {product.name}
          </Typography>

          <div className='product-container'>
            <ProductHero product={product} />
            <ProductDetails 
            item={item}
            variant={variant}
            product={product}
            choices={choices}
            setChoices={setChoices}
            userId={userId}
            />
          </div>

          <ProductSlider product={product} />

        </div>

      </div>
      
    </div>
  )
}

export default ProductView