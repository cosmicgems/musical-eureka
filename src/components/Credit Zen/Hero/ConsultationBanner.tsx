import React from 'react'
import {
  Typography,
  Box,
  Button
} from '@mui/material'
import lightThemOptions from '../../../styles/theme/lightThemeOptions'

const ConsultationBanner = () => {
  return (
    <Button sx={{}} className='p-0' href='/free-consultation'>
      <Box className='w-screen' sx={{bgcolor:lightThemOptions.palette.secondary.light}}>
        <div className=' w-screen text-center justify-center align-center'>
          <Typography variant='body1' component='div' sx={{textAlign:'center', padding: lightThemOptions.spacing(2)}}  className='w-screen' >
            Get some peace, and get your free credit report consultation today! <span className='' style={{fontWeight: 'bold'}}>START NOW</span>
          </Typography>
        </div>
      </Box>
    </Button>
    
  ) 
}

export default ConsultationBanner