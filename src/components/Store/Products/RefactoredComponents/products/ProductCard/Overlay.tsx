import { Typography } from '@mui/material'
import { USDollar } from 'helpers/usd'
import React from 'react'

const Overlay = ({product}) => {

    return (
        <div className='bg-slate-950/40 min-h-[17vh] w-full p-3 rounded flex flex-col'>
            <Typography variant='body2' component="div" className='gradient-text'>
                {product.name}
            </Typography>
            <Typography variant='body1' component="div" className='gradient-text-four'>
                {USDollar.format(product.price.value)}
            </Typography>
        </div>
    )
}

export default Overlay