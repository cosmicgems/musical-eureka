import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import Layout from './Layout'

const AppComingSoon = ({data}) => {
  return (
    <Box sx={{bgcolor:grey[800]}}>
        <Layout>
            <div className='min-h-[65vh] md:min-h-[50vh]  flex flex-col justify-center items-center px-6'>
                <Typography variant='h2' className='gradient-text-five text-center font-bold' sx={{}}>
                    {data.name} App Is Currently Under Construction...
                </Typography>
            </div>
        </Layout>
    </Box>
  )
}

export default AppComingSoon