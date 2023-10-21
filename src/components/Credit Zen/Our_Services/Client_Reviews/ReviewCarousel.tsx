import { CardMedia, Typography } from '@mui/material'
import React from 'react'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import theme from '../../../../styles/theme/lightThemeOptions';

const ReviewCarousel = () => {
  return (
    <div style={{}}>
      <div className='flex justify-center items-center' style={{marginBlockEnd:theme.spacing(3)}}>
        <CardMedia
        component='img'
        src='https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        sx={{width: '150px', height: '150px', borderRadius: '50%'}}
        className=''
        alt='happy client'
        />
      </div>
      <div style={{marginBlockEnd: theme.spacing(3)}}>
        <Typography variant='body1' sx={{}} className=''>
        Credit Zen helped me get my credit in order, so I could buy a new home. Without their help, I don&apos;t know where my credit would be. They are a true blessing. I will recommend them to anyone who needs help on repairing their credit.
        </Typography>
      </div>
      <div style={{paddingInline: theme.spacing(12), marginBlockEnd: theme.spacing(3)}}>
        <hr />
      </div>
      <div style={{marginBlockEnd: theme.spacing(1)}}>
        <Typography variant='body1' sx={{}} className='font-bold'>
          Name Place Holder
        </Typography>
      </div>
      <div >
        <Typography variant='body2' sx={{}} className=''>
          City, State
        </Typography>
      </div>
      <div style={{marginBlockEnd: theme.spacing(6)}}>
        <Typography variant='body2' sx={{}} className=''>
          July 1, 2020
        </Typography>
      </div>
      <div style={{marginBlockEnd: theme.spacing(6)}} className='flex flex-row items-center justify-center gap-12'>
        <div className='flex justify-center items-center'>
          <KeyboardArrowLeftRoundedIcon />
        </div>
        <div className='flex justify-center items-center gap-3'>
          <CircleOutlinedIcon />
          <CircleOutlinedIcon />
          <CircleOutlinedIcon />
        </div>
        <div className='flex justify-center items-center'>
          <KeyboardArrowRightRoundedIcon />
        </div>
      </div>

    </div>
  )
}

export default ReviewCarousel