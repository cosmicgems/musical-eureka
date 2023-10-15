import React from 'react'
import { appItems } from '../../../public/assets/appItems'
import App from './App'
import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

const AppBarContainer = () => {
  return (
    <Box className='w-full flex flex-col gap-2 py-3' sx={{bgcolor:grey[900]}}>
        <Typography variant='h3' className='gradient-text-two text-center'>
            Pearl Bar
        </Typography>
        <div className='w-[100%] flex overflow-x-auto gap-3'>
            {appItems.map((a, i) => (
                <div key={a._id} className='px-3'>
                    <App data={a} />
                </div>
                
            ))}
        </div>        
    </Box>

  )
}

export default AppBarContainer