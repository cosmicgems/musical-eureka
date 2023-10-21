import theme from '../../../styles/theme/lightThemeOptions'
import { Button, Typography } from '@mui/material'
import React from 'react'
import BlogPost from './BlogPost'

const FixCredit = () => {
  return (
    <div className='flex flex-col text-center' style={{padding: theme.spacing(3), backgroundColor: theme.palette.primary.light}}>

      <div style={{marginBlockEnd: theme.spacing(3)}}>
        <Typography variant='h3' sx={{}} className=''>
          Repairing Your Credit
        </Typography>
      </div>

      <div style={{marginBlockEnd: theme.spacing(3)}}>
        <Typography variant='body1' sx={{}} className=''>
        If inaccuracies and unfair errors on your credit history are the cause of a low credit score, taking legal steps to remove them may help.
        </Typography>
      </div>

      <div>
        {[1,2,].map((index) => {
          return (
            <div key={index} style={{marginBlockEnd: theme.spacing(3)}}>
              <BlogPost />
            </div>
          )
        })}
      </div>

      <div style={{marginBlockEnd: theme.spacing(6)}}>
        <Button variant='outlined' sx={{}} className=''>
          Load more
        </Button>
      </div>

      <div style={{marginBlockEnd: theme.spacing(3)}}>
        <Typography variant='h5' sx={{}} className=''>
          Repair. Improve. Peace.
        </Typography>
      </div>
      
      <div style={{marginBlockEnd: theme.spacing(3)}}>
        <Button variant='contained' sx={{}} className=''>
          Sign up now
        </Button>
      </div>

      <div>
        <Typography variant='body1' sx={{}} className=''>
          Or start online &gt;&gt;
        </Typography>
      </div>

    </div>
  )
}

export default FixCredit