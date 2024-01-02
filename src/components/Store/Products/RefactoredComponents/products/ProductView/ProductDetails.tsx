import { Typography } from '@mui/material'
import React from 'react'
import ProductPageQtyToggler from './ProductPageQtyToggler'
import InventoryIndicator from './InventoryIndicator'
import VariantOptions from './VariantOptions'
import WishlistAddBtn from './WishlistAddBtn'
import { USDollar } from 'helpers/usd'

const ProductDetails = ({ 
    product, 
    choices, 
    variant, 
    setChoices, 
    item, 
    userId
}) => {
    

    console.log(userId);

    
  return (
    <div className='product-info-wrapper'>
        <div className='product-description-container'>
            <Typography variant='body1' component="div" className='product-page-description'>
                {product.description}
            </Typography>
            <div className='product-page-variant-options'>
                <VariantOptions 
                options={product.options} 
                choices={choices}
                setChoices={setChoices}
                />
            </div>
            <Typography variant='h5' component="div" className='product-page-price'>
                {USDollar.format(product.price.value)}
            </Typography>            
        </div>
        <div className='product-actions-container'>
            
            <div className='product-inv-duo-container w-full'>

                <div className='inventory-indicator-wrapper'>
                    <InventoryIndicator stock={product.stock ? product.stock : 20} />
                </div>  

                <div className='product-qty-toggler-wrapper'>
                    <ProductPageQtyToggler
                    userId={userId}
                    product={product}
                    choices={choices}
                    item={item}
                    />
                </div>        
                
            </div>





        </div>

    </div>
  )
}

export default ProductDetails