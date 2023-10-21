import { Typography } from '@mui/material'
import React from 'react'
import ProcessCarousel from '../Process/ProcessCarousel'
import theme from '../../../styles/theme/lightThemeOptions'

const Process = () => {
  return (
    <div className='text-center min-h-screen' style={{backgroundColor: theme.palette.primary.light}}>

      <div style={{padding: theme.spacing(3)}}>
        
        <div style={{marginBlockEnd: theme.spacing(3)}}>
          <Typography variant='h3' sx={{}} className=''>
            The Credit Zen Process
          </Typography>
        </div>

        <div style={{marginBlockEnd: theme.spacing(3)}}>
          <Typography variant='h5' sx={{}} className=''>
            The Process That Affords You Peace
          </Typography>
        </div>
        
        <div>
          <ProcessCarousel />
        </div>


      </div>
    </div>
  )
}

export default Process