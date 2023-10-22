import React from 'react'
import {
  CardMedia,
  Typography,
  Button, 
  Box,
} from '@mui/material'
import { 
  grey
} from '@mui/material/colors'
import theme from '../../../styles/theme/lightThemeOptions'

const Hero = ({user}) => {
  return (
    <>
    
      <div className='absolute home-container w-screen h-screen  ' style={{backgroundImage: 'url("/credit_zen_home_page/family.gif")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
        <div className='overlay' style={{pointerEvents: "none"}} />  
      </div>
        <div className='text-center py-6 h-screen flex flex-col   justify-end ' >
            <Typography variant='h3' component='div' sx={{color: theme.palette.primary.light, paddingInline: theme.spacing(3), marginBlockEnd: theme.spacing(3)}} className='w-screen'>
              Smile Again With Credit Zen
            </Typography>     
            <Typography variant='h5' component='div' sx={{color: theme.palette.secondary.light, paddingInline: theme.spacing(3), marginBlockEnd: theme.spacing(3)}} className='w-screen'>
              Unlocking Financial Peace.
            </Typography>     
            <Typography variant='h6' component='div' sx={{color: theme.palette.secondary.light, paddingInline: theme.spacing(3), marginBlockEnd: theme.spacing(3)}} className='w-screen'>
              Credit Zen Streamlines Repair, Boosts Scores, and Elevate Lives
            </Typography>   
            {
              user === null || user === undefined ?
              <Box sx={{paddingInline: theme.spacing(3), marginBlockEnd: theme.spacing(4)}}>
                <Button variant='contained' >
                  Sign up online
                </Button>
              </Box>
            :
              <Box sx={{paddingInline: theme.spacing(3), marginBlockEnd: theme.spacing(4)}}>
                <Button onClick={()=>{console.log("click");
                }} href='/apps/credit-zen/assessments/credit' variant='contained' >
                  Start Now
                </Button>
              </Box>          
            }

            <Box sx={{paddingInline: theme.spacing(3)}} className=''>
              <Typography variant='body1' sx={{color: grey[50]}}>
                Get some peace with Credit Zen, and get those negative marks removed.
              </Typography>
            </Box>
        </div>  
    </>

  )
}

export default Hero