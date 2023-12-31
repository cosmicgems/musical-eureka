import { Typography } from '@mui/material'
import React from 'react'

const RecentlyViewedCardHeader = ({
    name,
    price,
}) => {
    return (
        <div className='recently-viewed-card-section-wrapper'>
            
            <Typography variant='body1' component="div" className='truncate-recently-viewed-title recently-viewed-text font-bold'>
                {name}
            </Typography>

            <Typography variant='caption' component="div" className=' recently-viewed-text' >
                {price}
            </Typography>

        </div>
    )
}

export default RecentlyViewedCardHeader