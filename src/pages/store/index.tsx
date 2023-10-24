import React from 'react'
import Layout from '../../components/Layout'
import { Box, Typography } from '@mui/material'
import Store from '../../components/Store/css/Store.module.css'

const StoreHome = () => {
  return (
    <Box>
        <Layout>
            <div className='gradient-text-home justify-center items-center min-h-[85vh]'>
                <Typography variant='h3' component="div" className='gradient-text'>
                    Store Home
                </Typography>
            </div>
        </Layout>        
    </Box>

    
  )
}

export default StoreHome