import theme from '../../../styles/theme/lightThemeOptions'
import { Button, Typography } from '@mui/material'
import React from 'react'

const MeasureUpCTA = () => {
  return (
    <div className='min-h-screen'>
      
      <div className='flex flex-col justify-center items-center text-center' style={{padding: theme.spacing(3)}}>

        <div style={{marginBlockEnd: theme.spacing(3)}}>
          <Typography variant='h3' sx={{}} className=''>
            Want to Know How Your Score Measures Up?
          </Typography>
        </div>

        <div style={{marginBlockEnd: theme.spacing(3)}}>
          <Typography variant='h5' sx={{}} className='text-center'>
            Sign up with Credit Zen today and get a:
          </Typography>
        </div>
        
        <div className=' flex flex-col gap-12 justify-center items-center text-center' style={{marginBlockEnd: theme.spacing(6)}}>
          
          <div>
            <div>
              <Typography variant='body1' sx={{color: theme.palette.primary.main}} className='font-bold'>
                FREE
              </Typography>
            </div>
            <div>
              <Typography variant='body1' sx={{}} className=''>
                personalized 
              </Typography>
            </div>
            <div>
              <Typography variant='body1' sx={{}} className=''>
                credit consultation
              </Typography>
            </div>            
          </div>
          
          <div>
            <div>
              <Typography variant='body1' sx={{color: theme.palette.primary.main}} className='font-bold'>
                FREE
              </Typography>
            </div>
            <div>
              <Typography variant='body1' sx={{}} className=''>
                TransUnion
              </Typography>
            </div>
            <div>
              <Typography variant='body1' sx={{}} className=''>
                FICO Score
              </Typography>
            </div>            
          </div>
          
          <div>
            <div>
              <Typography variant='body1' sx={{color: theme.palette.primary.main}} className='font-bold'>
                FREE
              </Typography>
            </div>
            <div>
              <Typography variant='body1' sx={{}} className=''>
                TransUnion
              </Typography>
            </div>
            <div>
              <Typography variant='body1' sx={{}} className=''>
                report summary
              </Typography>
            </div>            
          </div>

        </div>

        <div style={{marginBlockEnd: theme.spacing(1)}}>
          <Typography variant='body2' sx={{}} className=''>
            Get your free credit report consultation
          </Typography>
        </div>

        <div style={{marginBlockEnd: theme.spacing(3)}}>
          <Button variant='contained' sx={{}} className=''>
            Sign up online
          </Button>
        </div>

        <div style={{marginBlockEnd: theme.spacing(3)}}>
          <Typography variant='body1' sx={{}} className=''>
            Or start online &gt;&gt;
          </Typography>
        </div>

      </div>


    </div>
  )
}

export default MeasureUpCTA