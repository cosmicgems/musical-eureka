import theme from '../../../styles/theme/lightThemeOptions'
import { Button, Typography } from '@mui/material'
import React from 'react'

const HowToStart = () => {
  return (
    <div className='text-center' style={{padding: theme.spacing(3)}}>
      
      <div className='flex flex-col gap-6'>

        <div>
          <Typography variant='h3' sx={{}} className=''>
            Wondering How To Get Started?
          </Typography>
        </div>

        <div>
          <Typography variant='body1' sx={{}} className=''>
            You can sign up online or get a free credit report consultation
          </Typography>
        </div>

        <div>
          <Button variant='contained' sx={{}} className=''>
            Get started
          </Button>
        </div>

        <div>
          <Typography variant='body1' sx={{}} className='text-bold'>
            Or sign up online &gt;&gt;
          </Typography>
        </div>

      </div>
    </div>
  )
}

export default HowToStart