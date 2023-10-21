import theme from '../../../styles/theme/lightThemeOptions'
import { Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

const VisionStatement = () => {
  return (
    <div className='text-center ' style={{padding: theme.spacing(3), backgroundColor: theme.palette.primary.main}}>

      <div className='flex flex-col gap-6' style={{borderStyle: 'solid', borderColor: theme.palette.primary.light, borderRadius: '10px', padding: theme.spacing(3)}}>

        <div>
          <Typography variant='h3' sx={{color: theme.palette.secondary.light}} className=''>
            Vision Statement
          </Typography>
        </div>

        <div>
          <Typography variant='body1' sx={{color: grey[50]}} className=''>
          Our vision is to bring financial well-being within everyone&apos;s grasp. We strive to be the guiding light, simplifying credit and financial understanding, and empowering individuals and businesses to achieve lasting prosperity.
          </Typography>
        </div>

      </div>

    </div>
  )
}

export default VisionStatement