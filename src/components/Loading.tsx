import { Box, Typography } from '@mui/material'
import React from 'react'
import Layout from './Layout'
import { grey } from '@mui/material/colors'

const Loading = () => {
  return (
    <Box sx={{bgcolor: grey[500]}}>
      <Layout>

        <div className='min-h-[60vh] flex flex-col justify-center items-center w-full'>
          <Typography variant='h2' className='gradient-text w-full text-center'>
            Loading...
          </Typography>
        </div>

      </Layout>
    </Box>
  )
}

export default Loading