import theme from '../../../styles/theme/lightThemeOptions'
import { Button, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

const Hero = () => {
  return (
    <div className='' style={{}}>
        
        <div className='home-container flex flex-col h-screen  md:min-h-[85vh] items-center justify-end  content-end  text-center' style={{backgroundImage: 'url("/credit_zen_services_video/service_hero.gif")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', }}>
            <div className='overlay' />            
            <div style={{padding: theme.spacing(3)}}>
                <Typography variant='h3' sx={{marginBlockEnd: theme.spacing(3), color: theme.palette.primary.light}} className='text-center'>
                    Our Services
                </Typography>

                <Typography variant='h5' sx={{marginBlockEnd: theme.spacing(3), color: theme.palette.secondary.light}} className=''>
                    Discover the services that will give you peace.
                </Typography>

                <Typography variant='body1' sx={{marginBlockEnd: theme.spacing(3), color: grey[50]}} className=''>
                    Get a free credit report consultation to see which service is right for you
                </Typography>

                <div style={{marginBlockEnd: theme.spacing(2),}}>
                    <Button variant='contained' sx={{}} className=''>
                        Get started
                    </Button>
                </div>

                <Typography variant='body1' sx={{color: grey[50]}} className=''>
                    Or sign up online
                </Typography>
            </div>


        </div>




    </div>
  )
}

export default Hero