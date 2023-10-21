import theme from '../../../styles/theme/lightThemeOptions'
import { Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

const Hero = () => {
  return (
    <div className='text-center home-container' style={{backgroundImage: 'url("/credit_zen_contact/contact.gif")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', }}>
        <div className='overlay' />        
        <div className=' h-screen md:min-h-[85vh] text-center flex flex-col justify-end gap-3' style={{paddingInline: theme.spacing(3), paddingBlockEnd: theme.spacing(12)}}>

            <div>
                <Typography variant='h3' sx={{color: theme.palette.primary.light}} className=''>
                    Contact Us
                </Typography>
            </div>

            <div>
                <Typography variant='h5' component="div" sx={{color: theme.palette.secondary.light}} className=''>
                We’re here to help.
                </Typography>
            </div>

            <div>
                <Typography variant='body1' sx={{color: grey[50]}} className=''>
                Sign up for our service, reach out to client support or log in to your dashboard.
                </Typography>
            </div>
            
        </div>

    </div>
  )
}

export default Hero