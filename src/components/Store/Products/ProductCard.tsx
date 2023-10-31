import { Button, ButtonGroup, Typography } from '@mui/material'
import React, { useState } from 'react'
import { motion } from "framer-motion"
import { USDollar } from '../../../../helpers/usd'
import { useStateContext } from '../../../../Context/StateContext'
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';

const ProductCard = ({product, goToProductPage}) => {
    const { onAdd  } = useStateContext();
    const [showCartActions, setShowCartActions] = useState<boolean>(false);
    console.log(product);
    const handleClick = (e, handle) =>{
        e.preventDefault();
        goToProductPage(handle)
    }
    return (

        <motion.div
        onHoverStart={()=>{setShowCartActions(true)}}
        onHoverEnd={()=>{setShowCartActions(false)}}
        whileHover={{scale: 1.1, cursor:"pointer"}} 
        onClick={(e)=>{handleClick(e, product.node.handle)}} 
        className='w-[45vw] h-[33vh] md:w-[17.5vw] md:h-[45vh] rounded' 
        style={{backgroundImage: `url('${product.node.images.edges[0].node.url}')`, backgroundPosition: 'center', backgroundRepeat:'no-repeat', backgroundSize: "cover"}}>
            <div className='w-[100%] flex flex-col'>

                {
                    !showCartActions ?
                        <div className='bg-slate-950/40 h-[17vh] p-3 rounded flex flex-col'>
                            <Typography variant='body2' component="div" className='gradient-text'>
                                {product.node.title}
                            </Typography>
                            <Typography variant='body1' component="div" className='gradient-text-four'>
                                {USDollar.format(product.node.priceRange.maxVariantPrice.amount)}
                            </Typography>
                        </div>                        
                    :
                    showCartActions ?
                    <div  className='  min-h-[33vh] flex flex-col justify-end '>
                        <ButtonGroup variant='contained'>
                            <Button onClick={()=>{onAdd(product, 1)}} sx={{borderTopLeftRadius: '0', borderTopRightRadius: '0'}} className='w-full'>
                                <AddShoppingCartRoundedIcon />
                            </Button>
                            <Button sx={{borderTopLeftRadius: '0', borderTopRightRadius: '0'}} className='w-full'>
                                <ShoppingCartCheckoutRoundedIcon />
                            </Button>
                        </ButtonGroup>       
                    </div>   
                :
                null   
                }


            </div>
        </motion.div>

    )
}

export default ProductCard