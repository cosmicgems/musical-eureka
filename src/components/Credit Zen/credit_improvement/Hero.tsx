import theme from '../../../styles/theme/lightThemeOptions'
import { Button, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

const Hero = () => {
  return (
    <div className='home-container min-h-[85vh] flex flex-col justify-end items-center' style={{backgroundImage: 'url("/credit_zen_credit_assistance/credit_assistance.gif")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', }}>
    <div className='overlay' /> 

      <div className='text-center' style={{padding: theme.spacing(3), marginBlockEnd: theme.spacing(1)}}>

        <div style={{marginBlockEnd: theme.spacing(1)}}>
          <Typography variant='h3' sx={{color: theme.palette.primary.light}} className=''>
            Credit Assistance
          </Typography>
        </div>
        <div style={{marginBlockEnd: theme.spacing(3)}}>
          <Typography variant='h5' sx={{color: theme.palette.secondary.light}} className=''>
            We have resources to help
          </Typography>
        </div>    

        <div style={{marginBlockEnd: theme.spacing(3)}}>
          <Typography variant='body1' sx={{color: grey[50]}} className=''>
          Obtaining a better credit score can seem like a daunting task, especially when you don&apos;t know where to start. Credit Zen is here to help you reach your credit score goals. Explore if our credit repair services are suited for you.
          </Typography>
        </div>

        <div style={{marginBlockEnd: theme.spacing(3)}}>
          <Button variant='contained' sx={{}} className=''>
            Get started now
          </Button>
        </div>

        <div>
          <Typography variant='body2' sx={{}} className=''>
            Or sign up online &gt;&gt;
          </Typography>
        </div>
        
      </div>



    </div>
  )
}

export default Hero