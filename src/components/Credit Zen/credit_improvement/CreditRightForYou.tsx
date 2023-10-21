import { Button, Typography } from '@mui/material'
import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import theme from '../../../styles/theme/lightThemeOptions';

const CreditRightForYou = () => {
  return (
    <div style={{backgroundColor: theme.palette.primary.light}}>

      <div style={{padding: theme.spacing(3)}} className='flex flex-col justify-center items-center'>

        <div style={{marginBlockEnd: theme.spacing(3)}}>
          <Typography variant='h5' sx={{}} className=''>
            Is Credit Repair Right For You?
          </Typography>
        </div>

        <div style={{marginBlockEnd: theme.spacing(3)}}>
          <Typography variant='body1' sx={{}} className=''>
          Depending on the status of your credit report, credit repair might not be the best next step to raising your credit score. Our credit repair services are designed to help those who are most in need of negative item removals from their report.
          </Typography> 
        </div>

        <div style={{marginBlockEnd: theme.spacing(3)}}>
          <Typography variant='body1' sx={{}} className=''>
            Answer the following questions to find out if credit repair is right for you.
          </Typography>
        </div>

        <div className='flex flex-col justify-center items-center text-center'>

          <form>

            <div style={{padding: theme.spacing(3)}} className='flex flex-col gap-6'>


              <div className='flex flex-col gap-2 justify-center items-center text-center'>
                
              <div>
              <Typography variant='body1' sx={{}} className='font-bold'>
                Have you ever made a late payment?
              </Typography>
              </div>
                <RadioGroup
                className='flex flex-row  justify-center items-center'
                  aria-labelledby="Have you ever made a late payment question for test to see if credit repair is right for you."
                  defaultValue=""
                  name="radio-buttons-group"
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>

              </div>


              <div className='flex flex-col gap-2 justify-center items-center text-center'>
                
              <div>
              <Typography variant='body1' sx={{}} className='font-bold'>
                Have you recently had your credit checked?
              </Typography>
              </div>
                <RadioGroup
                className='flex flex-row  justify-center items-center'
                  aria-labelledby="Have you ever made a late payment question for test to see if credit repair is right for you."
                  defaultValue=""
                  name="radio-buttons-group"
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>

              </div>


              <div className='flex flex-col gap-2 justify-center items-center text-center'>
                
              <div>
              <Typography variant='body1' sx={{}} className='font-bold'>
                Have you ever been denied a loan or credit card?
              </Typography>
              </div>
                <RadioGroup
                className='flex flex-row  justify-center items-center'
                  aria-labelledby="Have you ever made a late payment question for test to see if credit repair is right for you."
                  defaultValue=""
                  name="radio-buttons-group"
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>

              </div>


            </div>

            <div style={{marginBlockEnd: theme.spacing(3)}}>
              <Button variant='contained' sx={{}} className=''>
                Find Out Now
              </Button>
            </div>

          </form>


        </div>
        
        <div>
          <Typography variant='body1' sx={{}} className=''>
            Or sign up online &gt;&gt;
          </Typography>
        </div>

      </div>

    </div>
  )
}

export default CreditRightForYou