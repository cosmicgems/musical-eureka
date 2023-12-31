import React, { useState } from 'react'
import { Button, ButtonGroup } from '@mui/material'
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';
import { useAddItem } from '@common/cart';
import { Choices, getVariant } from '@components/Store/Products/helpers';

const Buttons = ({product}) => {
    const [ choices, setChoices ] = useState<Choices>({})
    const [travel, setTravel] = useState<boolean>(true);

    const addItem = useAddItem();

    const variant = getVariant(product, choices)

    const addToCart = async() => {
        try {
            const item = {
                productId: String(product.id),
                variantId: String(variant ? variant.id : product.variants[0].id || "hja78dha89a"),
                quantity: 1
            }
            
            const output = await addItem(item)
            console.log(output);
            
        } catch (error) {
            
        }
    }


    return (
        <div onMouseOver={()=> {setTravel(false)}} onMouseLeave={()=>{setTravel(true)}}  className='w-[45vw] h-[33vh] md:w-[17.5vw] md:h-[45vh] flex flex-col justify-end '>
        <ButtonGroup variant='contained'>
            <Button onClick={()=>{
            }} sx={{borderTopLeftRadius: '0', borderTopRightRadius: '0'}} className='w-full'>
                <AddShoppingCartRoundedIcon />
            </Button>
            <Button sx={{borderTopLeftRadius: '0', borderTopRightRadius: '0'}} className='w-full'>
                <ShoppingCartCheckoutRoundedIcon />
            </Button>
        </ButtonGroup>       
    </div>              
    )
}

export default Buttons