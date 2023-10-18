import React from 'react'
import Layout from '../../components/Layout'
import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

const AppsPage = () => {
  return (
    <Box sx={{bgcolor: grey[800]}}>
        <Layout>
            <div className='h-screen flex flex-col justify-center items-center'>
                <Typography variant='h3' className='gradient-text-four'>
                    App Page
                </Typography>
            </div>
        </Layout>        
    </Box>

  )
}

export default AppsPage