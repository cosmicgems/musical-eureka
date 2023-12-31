import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

const CategoryHeader = ({name}) => {
    return (

        <div className='sm:py-3 sm:pr-3 md:w-1/4 z-10 relative'>
                <Box 
                    sx={{
                        bgcolor: {md:grey[900]}
                    }} 
                    className=' rounded p-3 w-full'
                >

                    <Typography variant='h5' component="div" sx={{}} className='text-left gradient-text-subcategories'>
                        {name}. <Typography
                                                variant='h5'
                                                component="div"
                                                className='inline'
                                                sx={{
                                                    color: {xs: grey[50],md:grey[50]} 
                                                }}>
                                Everything you need to know. Plus more.
                            </Typography>
                    </Typography>

                </Box>    
        </div>

    )
}

export default CategoryHeader