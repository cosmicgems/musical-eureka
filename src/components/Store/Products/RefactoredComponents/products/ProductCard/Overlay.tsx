import { Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { USDollar } from 'helpers/usd'
import React from 'react'

const Overlay = ({product}) => {

    return (
        <div className='bg-slate-950/40 min-h-full w-full p-3 rounded flex flex-col justify-between'>
            <Typography variant='body2' component="div" className='product-card-name' >
                {product.name}
            </Typography>
            <Typography variant='h6' component="div" className='product-card-price' sx={{color: grey}}>
                {USDollar.format(product.price.value)}
            </Typography>
        </div>
    )
}

export default Overlay