import theme from '../../../styles/theme/lightThemeOptions'
import { Button, Typography } from '@mui/material'
import React from 'react'
import CreditScoreCostToYouCalculator from './CreditScoreCostToYouCalculator'

const CreditCost = () => {
  return (
    <div style={{backgroundColor: theme.palette.secondary.light, padding: theme.spacing(3)}}>
      
      <div className='text-center' style={{marginBlockEnd: theme.spacing(2)}}>
        <Typography variant='h4' component="div" className='' sx={{}}>
          How can good credit bring you peace?
        </Typography>
      </div>

      <div className='text-center' style={{marginBlockEnd: theme.spacing(3)}}>
        <Typography variant='body1' sx={{}} className=''>
          First, you could put thousands of dollars back in your pocket over the term of your loan.
        </Typography>
      </div>

      <div style={{marginBlockEnd: theme.spacing(3)}}>
        <CreditScoreCostToYouCalculator />
      </div>

      <div className='text-center' style={{marginBlockEnd: theme.spacing(1)}}>
        <Typography variant='body1' sx={{}} className='text-bold'>
          Find out how much you can keep in your pocket with credit repair
        </Typography>
      </div>

      <div className='text-center'>
        <Button  variant='contained' sx={{}} className=''>
          Start Your Journey
        </Button>
      </div>
    </div>
  )
}

export default CreditCost