import theme from '../../../styles/theme/lightThemeOptions'
import { Typography } from '@mui/material'
import React from 'react'

const ScoreNeeded = () => {
  return (
    <div style={{backgroundColor: theme.palette.primary.main}}>
      
      <div className='flex flex-col gap-3 justify-center items-center' style={{padding: theme.spacing(3)}}>

        <div style={{}}>
          <Typography variant='h4' component="div" sx={{color: theme.palette.primary.light}} className=''>
            What Score Do I Need...
          </Typography>
        </div>

        <div className='w-full text-center' style={{borderStyle: 'solid', borderWidth: '2px', borderColor: theme.palette.primary.light, borderRadius: '10px', padding: theme.spacing(3), marginBlock: theme.spacing(3)}}>
          Drop Down Menu Placeholder
        </div>

        <div>
          <Typography variant='body1' sx={{color: theme.palette.secondary.light}} className='font-bold'>
          Without a credit score of at least 620 you are unlikely to qualify for a home loan, and even then, you may find it difficult to get approved. Scores of 700 or higher are ideal for securing low interest rates and moderate monthly payments.
          </Typography>
        </div>

      </div>

    </div>
  )
}

export default ScoreNeeded