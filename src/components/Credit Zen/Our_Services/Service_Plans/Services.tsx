import { Button, Typography } from '@mui/material'
import React from 'react'
import ServiceList from './ServiceList'
import theme from '../../../../styles/theme/lightThemeOptions'

const Services = () => {
  return (
    <div className='min-h-screen text-center'  style={{padding: theme.spacing(3)}}>
        
        <div style={{marginBlockEnd: theme.spacing(3)}}>
            <Typography variant='h3' sx={{}} className=''>
                Our Levels of Service
            </Typography>
        </div>

        <div style={{marginBlockEnd: theme.spacing(3)}}>
            <Typography variant='body1' sx={{}} className=''>
                Get the most out of the service level based on your needs
            </Typography>
        </div>

        <div style={{marginBlockEnd: theme.spacing(3)}}>
            <ServiceList />            
        </div>

        <div style={{marginBlockEnd: theme.spacing(3)}}>
            <Typography variant='body1' sx={{}} className=''>
                See which services fit your needs with a FREE credit report consultation.
            </Typography>
        </div>

        <div style={{marginBlockEnd: theme.spacing(1)}}>
            <Button variant='contained' sx={{}} className=''>
                Start now
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

export default Services