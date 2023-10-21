import theme from '../../../styles/theme/lightThemeOptions'
import { Button, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

const Hero = () => {
  return (
    <div className='home-container' style={{backgroundImage: 'url("/credit_zen_about_page/about_creditZen.gif")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', }}>
      <div className='overlay' />
      <div className=' h-[85vh] text-center flex flex-col justify-end gap-3' style={{paddingInline: theme.spacing(3), paddingBlockEnd: theme.spacing(12)}}>
        
        <div>
          <Typography variant='h3' sx={{color: theme.palette.primary.light}} className=''>
            Get To Know Credit Zen
          </Typography>
        </div>

        <div>
          <Typography variant='h5' sx={{color: theme.palette.secondary.light}} className=''>
          Elevate Your Financial Journey with Credit Zen
          </Typography>
        </div>

        <div>
          <Typography variant='body1' sx={{color: grey[50]}} className=''>
            Unveiling Clarity, Confidence, and Peace in Credit Mastery. Our Goal is to Empower You on Your Path to Financial Well-being.
          </Typography>
        </div>

        <div>
          <Button variant='contained' sx={{}} className=''>
            Sign up today
          </Button>
        </div>

      </div>

    </div>
  )
}

export default Hero