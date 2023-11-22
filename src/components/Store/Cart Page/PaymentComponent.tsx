import { Button, ButtonGroup, Typography } from '@mui/material'
import React from 'react'
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { grey } from '@mui/material/colors';

const PaymentComponent = ({handleBack, handleNext}) => {
  return (
    <div className='flex flex-col gap-3 p-3'>
        <div className='flex gap-1 items-center'>
            <CreditCardIcon sx={{color: grey[50]}} />
            <Typography variant="h5" component="div" className='gradient-text'>
                Payment Info
            </Typography>
        </div>
        <ButtonGroup className='w-full'>
            <Button className='w-1/2' onClick={handleBack}>
                Back
            </Button>
            <Button className='w-1/2' onClick={handleNext}>
                Next
            </Button>
        </ButtonGroup>
    </div>
  )
}

export default PaymentComponent