import theme from '../../../styles/theme/lightThemeOptions'
import { Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

const MissionStatement = () => {
  return (
    <div className='flex flex-col justify-center items-center  text-center' style={{backgroundColor: theme.palette.primary.main, padding: theme.spacing(3)}}>

      <div  className='flex flex-col gap-6'  style={{borderStyle: 'solid', borderColor: theme.palette.primary.light, borderRadius: '10px', padding: theme.spacing(3)}}>
        
        <div>
          <Typography variant='h3' sx={{color: theme.palette.secondary.light}} className=''>
            Mission Statement
          </Typography>
        </div>

        <div>
          <Typography variant='body1' sx={{color: grey[50]}} className=''>
          Our mission is to empower individuals and businesses to attain mastery over their financial well-being. We embarked on this journey with the firm conviction that the comprehension of credit and finance need not be convoluted. Our purpose is to unravel the intricacies of credit repair, advocate for equitable credit reporting, and furnish the tools needed for wise financial choices.
          </Typography>
        </div>

      </div>


    </div>
  )
}

export default MissionStatement