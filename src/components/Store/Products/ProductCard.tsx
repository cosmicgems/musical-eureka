import { Typography } from '@mui/material'
import React from 'react'
import { motion } from "framer-motion"

const ProductCard = ({product, goToProductPage}) => {
    console.log(product);
    const handleClick = (e, handle) =>{
        e.preventDefault();
        goToProductPage(handle)
    }
    return (

        <motion.div whileHover={{scale: 1.1}} onClick={(e)=>{handleClick(e, product.node.handle)}} className='w-[45vw] h-[33vh] rounded' style={{backgroundImage: `url('${product.node.images.edges[0].node.url}')`, backgroundPosition: 'center', backgroundRepeat:'no-repeat', backgroundSize: "cover"}}>
            <div className='w-[100%] flex flex-col'>

                <div className='bg-slate-950/40 h-[11vh] p-3'>
                    <Typography variant='body2' component="div" className='gradient-text'>
                        {product.node.title}
                    </Typography>
                </div>

            </div>
        </motion.div>

    )
}

export default ProductCard