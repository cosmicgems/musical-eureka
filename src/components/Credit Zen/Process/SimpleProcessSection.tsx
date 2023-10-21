import React from 'react'
import {
  Typography
} from '@mui/material'
import theme from '../../../styles/theme/lightThemeOptions'
import ProcessCarousel from './ProcessCarousel'

const SimpleProcessSection = () => {
  return (
    <div className='flex flex-col h-content ' style={{paddingInline: theme.spacing(3), paddingBlockEnd: theme.spacing(3)}}>
      <Typography sx={{paddingBlock: theme.spacing(3)}} variant='h3' className='text-center '>
        Credit Zen in a simple three step process
      </Typography>
      <Typography variant='body2' sx={{paddingInline:theme.spacing(3)}} className='text-center '>
        Credit repair embodies the journey of recognizing and tackling any unjust, inaccurate, or unconfirmed negative elements that are impacting your credit score – think of it as having your back when collections, late payments, charge-offs, and more are causing trouble. It&apos;s about standing together to make things right and pave the way for better financial days ahead.
      </Typography>
      <div className='grow'>
        <ProcessCarousel />
      </div>
    </div>
  )
}

export default SimpleProcessSection