import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

const MediaSectionHeader = () => {
    return (

        <div className='sm:p-3 md:w-1/4'>
                <Box 
                    sx={{
                        bgcolor: {md:grey[900]}
                    }} 
                    className=' rounded p-3 w-full'
                >

                    <Typography variant='h5' component="div" sx={{}} className='text-left gradient-text-subcategories'>
                        Curated Media. <Typography
                                                variant='h5'
                                                component="div"
                                                className='inline'
                                                sx={{
                                                    color: {xs: grey[900],md:grey[50]} 
                                                }}>
                                High quality & relevant content.
                            </Typography>
                    </Typography>

                </Box>    
        </div>
    )
}

export default MediaSectionHeader