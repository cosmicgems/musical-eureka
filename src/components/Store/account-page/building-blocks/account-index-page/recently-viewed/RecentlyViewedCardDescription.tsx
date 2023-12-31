import { Typography } from '@mui/material'
import React from 'react'

const RecentlyViewedCardDescription = ({
    description,
}) => {
    return (
        <div className='recently-viewed-card-section-wrapper'>

            <Typography variant='body2' component="div" className='truncate-description recently-viewed-text'>
                {description}
            </Typography>

        </div>
    )
}

export default RecentlyViewedCardDescription