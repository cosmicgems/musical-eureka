import React from 'react'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Button, CardMedia, Typography } from '@mui/material';
import theme from '../../../styles/theme/lightThemeOptions';
import { grey } from '@mui/material/colors';

const StatisticsComponent = () => {
  return (
    <div className='text-center min-h-screen flex flex-col' style={{padding: theme.spacing(3), backgroundColor: theme.palette.primary.main}}> 

      <div>
        <Typography variant='h3' sx={{marginBlockEnd: theme.spacing(3), color: theme.palette.secondary.light}} className=''>
          Repair. Improve. Peace.
        </Typography>
      </div>

      <div className=' items-center justify-center flex flex-col' style={{marginBlockEnd: theme.spacing(3)}}>
        <div className=' flex  justify-center items-center' style={{width:'37vh', height:'37vh', backgroundColor: theme.palette.primary.light, borderRadius: '50%'}}>
          <div>
            <CardMedia 
            component='img'
            src='/credit_zen_services_video/point_increase_two.gif'
            alt='Man sitting in front of his computer, which is probably a macbook but I can not be for sure, but he has his arms in the air and fist clenched and he is happy. The image is meant to show that after working with credit zen, you will be at peace and have happiness. Like this guy.'
            sx={{ width:'33vh', height: '33vh', borderRadius: '50%', }}
            className=''
            />                 
          </div>
     
        </div>



        <div className='flex flex-row ' style={{marginBlockEnd: theme.spacing(3)}}>
          
          <div>
            <ArrowDropUpIcon sx={{color: theme.palette.primary.light}} />
          </div>
          
          <div>
            <Typography variant='h1' sx={{color: theme.palette.primary.light}} className=''>
              47 PTS
            </Typography>
          </div>

        </div>
      </div>

      <div className='grow' style={{marginBlockEnd: theme.spacing(3)}}>
        <Typography variant='body1' className='' sx={{color: grey[50]}} >
          92% of our clients who saw their score increase saw an average improvement of 50 points while working with Credit Zen.
        </Typography>
      </div>

      <div className='grow-0' style={{marginBlockEnd: theme.spacing(3)}}>
        <Typography variant='body1' className='' sx={{color: grey[50]}} >
          See how we count score improvement
        </Typography>
      </div>

      <div className='grow-0' style={{marginBlockEnd: theme.spacing(3)}}>
        <Button variant='contained' sx={{backgroundColor: theme.palette.primary.light, color:grey[900]}} className=''>
          Sign up now
        </Button>
      </div>

      <div className='grow-0'>
        <Typography variant='body1' className='' sx={{color: grey[50]}} >
          Or get your FREE consultation online
        </Typography>
      </div>

    </div>
  )
}

export default StatisticsComponent