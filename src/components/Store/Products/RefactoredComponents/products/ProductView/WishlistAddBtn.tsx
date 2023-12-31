import React from 'react'
import { Button } from '@mui/material'
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';
import axios from 'axios';


const WishlistAddBtn = ({product, userId}) => {
    console.log(product);
    const wishlistItem = {
        price: product.price.value,
        name: product.name,
        image: product.images[0].url,
        path: `/store/products/product${product.path}`,
        desc: product.description,
        qty: 1,
    }
    
    const handleAddWishlistItem = async (e:any) => {
        e.preventDefault();

        try {
            const res = await axios.put(`/api/store/user/wishlist/add-remove-item?productId=${product.id}&userId=${userId}`, {wishlistItem})
            console.log(res.data);
            
        } catch (error) {
            console.error(`***Error Message: ${error}`);
        }
    }
    
    return (
        <div>
            <Button onClick={(e)=> {handleAddWishlistItem(e)}}>
                <PlaylistAddRoundedIcon />
            </Button>
        </div>
    )
}

export default WishlistAddBtn