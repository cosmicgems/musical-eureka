import React, { useState } from 'react'
import {
  CardMedia, Typography
} from '@mui/material'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import theme from '../../../styles/theme/lightThemeOptions';
import { process } from '../../../../public/assets/process'

const ProcessCarousel = () => {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <div className=' text-center py-6'>
      <div className='items-center justify-center flex pt-6' style={{}}> 
        <CardMedia 
        component='img'
        image={process[activeStep].image}
        alt=''
        sx={{width: '175px', height: '175px', borderRadius:'50%', objectFit: 'cover', marginBlockEnd: theme.spacing(3)}}
        />        
      </div>
      <div>
        <div>
          <Typography sx={{}} variant='h5' className=''>
            {process[activeStep].step_number}
          </Typography>
        </div>
      </div>
      <div style={{marginBlockEnd: theme.spacing(2)}}>
        <Typography variant='h5' component='div' sx={{}} className=''>
          {process[activeStep].name}
        </Typography>
      </div>
      <div className='h-[17vh]' style={{marginBlockEnd: theme.spacing(3)}}>
        <Typography variant='body1' component='div' sx={{}} className=''>
          {process[activeStep].description}
        </Typography>
      </div>
      <div className='flex flex-row justify-evenly'>
        <div>
          <KeyboardArrowLeftRoundedIcon onClick={() => setActiveStep(prevStep => Math.max(prevStep - 1, 0))} />
        </div>
        <div className='flex justify-center gap-4'>
          {activeStep === 0 ? 
            <CircleIcon /> : <CircleOutlinedIcon />
          }
          {activeStep === 1 ? 
            <CircleIcon /> : <CircleOutlinedIcon />
          }
          {activeStep === 2 ? 
            <CircleIcon /> : <CircleOutlinedIcon />
          }
        </div>
        <div>
          <KeyboardArrowRightRoundedIcon onClick={() => setActiveStep(prevStep => Math.min(prevStep + 1, process.length - 1))} />
        </div>
      </div>
      

    </div>
  )
}

export default ProcessCarousel