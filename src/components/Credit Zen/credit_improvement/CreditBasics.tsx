import theme from '../../../styles/theme/lightThemeOptions'
import { Button, Typography } from '@mui/material'
import React from 'react'
import BlogPost from './BlogPost'

const CreditBasics = () => {
  return (
    <div  style={{backgroundColor: ''}}>

      <div className='flex flex-col justify-center items-center text-center gap-3' style={{padding: theme.spacing(3)}}>
        
        <div>
          <Typography variant='h4' component="div" sx={{}} className=''>
            Credit Basics
          </Typography>
        </div>

        <div>
          <Typography variant='body1' sx={{}} className=''>
          If you pulled your credit report and were shocked by a low score, start with the basics. Understanding the five credit score factors will help you take action to improve them in the future.
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

    </div>
  )
}

export default CreditBasics