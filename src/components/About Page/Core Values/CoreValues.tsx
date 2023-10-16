import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import CoreValuesContainer from './Components/CoreValuesContainer'

const CoreValues = () => {
  return (
    <Box sx={{bgcolor: grey[900]}} className="">

        <div className='flex flex-col gap-3 py-3'>

            <Typography variant='h3' className='gradient-text text-center' sx={{}}>
                Core Values
            </Typography>
            
            <CoreValuesContainer />

        </div>

    </Box>
  )
}

export default CoreValues