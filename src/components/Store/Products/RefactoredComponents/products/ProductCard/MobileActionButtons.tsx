import React, { useState } from 'react'
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';
import useAddItem from "@framework/cart/use-add-item"
import { Choices, getVariant } from '@components/Store/Products/helpers'
import { toast } from 'react-hot-toast'

const MobileActionButtons = ({
    product,
}) => {

    const [ choices, setChoices ] = useState<Choices>({});
    const [quantity, setQuantity] = useState<number>(1);

    
    const variant = getVariant(product, choices);

    const addItem = useAddItem();

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

    return (
        <div className='flex justify-between px-2'>

            <div
            className='product-card-icon-btn_add'
            >
                
                <AddShoppingCartRoundedIcon
                className='mobile-action-btn' 
                />

            </div>


            <div
            className='product-card-icon-btn_wishlist'
            >
                
                <PlaylistAddRoundedIcon
                className='mobile-action-btn' 
                />

            </div>

        </div>
    )
}

export default MobileActionButtons