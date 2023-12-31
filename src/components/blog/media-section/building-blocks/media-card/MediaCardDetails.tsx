import { Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

const MediaCardDetails = ({video}) => {
    return (

        <div className='p-3 flex flex-col gap-3 justify-between'>

            <Typography variant='h6' component="div" className='gradient-text-three text-center' sx={{}}>
                {video.snippet.title}
            </Typography>

            <Typography variant='body1' className='truncate-text' sx={{color:grey[900]}}>
                {video.snippet.description}
            </Typography>           
            
        </div>
    )
}

export default MediaCardDetails