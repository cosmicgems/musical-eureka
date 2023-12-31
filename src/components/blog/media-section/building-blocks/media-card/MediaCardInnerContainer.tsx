import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import MediaCardVideo from './MediaCardVideo'
import MediaCardDetails from './MediaCardDetails'

const MediaCardInnerContainer = ({video}) => {
    return (
        <div className='w-screen md:w-auto flex justify-center'>
            <Box 
                sx={{
                    bgcolor: grey[100], 
                    borderRadius: "5px", 
                    boxShadow: '5px 5px 5px #000'
                }} 
                className="w-[350px] sm:w-[400px]"
            >

                <MediaCardVideo video={video} />
                
                <MediaCardDetails video={video} />

            </Box>            
        </div>

    )
}

export default MediaCardInnerContainer  