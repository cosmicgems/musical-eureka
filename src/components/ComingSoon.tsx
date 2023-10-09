import { Box, CardMedia, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import Layout from './Layout'

const ComingSoon = () => {
  return (
    <Box sx={{bgcolor: grey[700]}}>
        <Layout>
            <div className='flex flex-col gap-3 mt-12 pt-12'>
                <Typography sx={{}} variant='h2' className='gradient-text-five w-[100%] text-center font-bold'>
                    Coming Soon
                </Typography>    
                <CardMedia
                    component="img"
                    image='https://www.transplantchild.eu/wp-content/uploads/image001.gif'
                />             
            </div>

        </Layout>
    </Box>
  )
}

export default ComingSoon