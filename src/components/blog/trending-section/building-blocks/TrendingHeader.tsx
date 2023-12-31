import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

const TrendingHeader = () => {
    return (

        <div className='sm:p-3 md:w-1/4'>
                <Box 
                    sx={{
                        bgcolor: {md:grey[900]}
                    }} 
                    className=' rounded p-3 w-full'
                >

                    <Typography variant='h5' component="div" sx={{}} className='text-left gradient-text-subcategories'>
                        Trending Articles. <Typography
                                                variant='h5'
                                                component="div"
                                                className='inline'
                                                sx={{
                                                    color: {xs: grey[50],md:grey[50]} 
                                                }}>
                                Everything you need relevant.
                            </Typography>
                    </Typography>

                </Box>    
        </div>


    )
}

export default TrendingHeader