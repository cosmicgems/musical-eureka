import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react'

const FeaturedCardExcerpt = ({
    excerpt,
    excerptTwo
}) => {

    return (
        <div>
                <Typography variant='body1' sx={{color: grey[50]}} className='truncate-text w-full '   >
                    {
                        excerpt ?
                        <>
                        {excerpt}
                        </>
                        
                        :
                        <>
                        {excerptTwo} 
                        </>
                    }
                </Typography> 
        </div>
    )
}

export default FeaturedCardExcerpt