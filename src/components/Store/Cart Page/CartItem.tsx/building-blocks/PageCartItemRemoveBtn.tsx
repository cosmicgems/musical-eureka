import React from 'react'
import { motion } from 'framer-motion';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { red } from '@mui/material/colors';
import useRemoveItem from '@framework/cart/use-remove-item';

const PageCartItemRemoveBtn = ({product, editCart}) => {

    const removeItem = useRemoveItem()

    return (                              
        <div className='relative flex justify-end rounded w-full'>

            {
                editCart &&
                <motion.span whileHover={{scale:1.5}} className='rounded' onClick={(e)=> {e.preventDefault(); removeItem({id: product.id})}}>
                    <HighlightOffRoundedIcon sx={{fontSize: '2rem', color: red[500]}} className='absolute p-1 rounded right-[-20px] top-[-20px]' />
                </motion.span>                
            }

        </div> 
    )
}

export default PageCartItemRemoveBtn