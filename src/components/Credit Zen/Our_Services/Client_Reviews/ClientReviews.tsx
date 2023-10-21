import { Button, Typography } from '@mui/material'
import React from 'react'
import ReviewCarousel from './ReviewCarousel'
import theme from '../../../../styles/theme/lightThemeOptions'

const ClientReviews = () => {
  return (
    <div className='text-center' style={{padding: theme.spacing(3), backgroundColor: theme.palette.primary.light}}>
      <div style={{marginBlockEnd: theme.spacing(3)}}>
        <Typography variant='h3' sx={{}} className=''>
          What our clients are saying
        </Typography>
      </div>
      <div style={{marginBlockEnd: theme.spacing(3)}}>
        <ReviewCarousel />
      </div>
      <div style={{marginBlockEnd: theme.spacing(1)}}>
        <Typography variant='body1' sx={{}} className=''>
        Join over 520,000 Credit Zen active clients working to repair their credit
        </Typography>
      </div>
      <div style={{marginBlockEnd: theme.spacing(3)}}>
        <Button variant='contained' sx={{backgroundColor: theme.palette.primary.main}} className=''>
          Get started
        </Button>
      </div>
      <div>
        <Typography variant='body1' sx={{}} className=''>
          Or sign up online &gt;&gt;
        </Typography>
      </div>
    </div>
  )
}

export default ClientReviews