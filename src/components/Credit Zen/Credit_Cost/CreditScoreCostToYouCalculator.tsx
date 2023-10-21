import React, { useState } from 'react'
import { Typography } from '@mui/material'
import theme from '../../../styles/theme/lightThemeOptions'
import { amber, blue, deepOrange, green, grey, red } from '@mui/material/colors'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { motion } from 'framer-motion'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const CreditScoreCostToYouCalculator = () => {
  const [credit, setCredit] = useState(["Personal Loan", "Auto Loan", "Mortgage Loan", "Credit Card"]);
  const [loanType,setLoanType] = useState(credit[0]);
  return (
    <div>
      
      <div className='' style={{borderRadius: '10px', borderWidth: '3px', borderStyle:'solid', borderColor: theme.palette.primary.main, backgroundColor: '#fff', padding:theme.spacing(3)}}>
          <div style={{marginBlockEnd: theme.spacing(4)}}>
            <Typography variant='h6' component='div' sx={{}} className='text-center'>
              Credit Score Type Placeholder
            </Typography>          
            <motion.div
            className='absolute'
            drag="x"
            dragConstraints={{ left: -25, right: 290}}
            dragElastic={0}
            dragMomentum={false}
            >
          
              <ArrowDropDownRoundedIcon sx={{fontSize: '4rem', color: grey[500],}}/>              
          </motion.div>
          </div>


          <div  style={{borderRadius: '5px', borderWidth: '1px', borderStyle:'solid', borderColor: theme.palette.primary.main, marginBlockEnd: theme.spacing(3)}}>

            <div className='flex flex-row gap-[2px] ' style={{borderRadius: '10px',}}>

              <div className='w-[50.73%] h-[2vh]' style={{backgroundColor: red[500], borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px'}}>

              </div>
              <div className='w-[16.19%]' style={{backgroundColor: deepOrange[500]}}>

              </div>
              <div className='w-[12.95%]' style={{backgroundColor: amber[500]}}>

              </div>
              <div className='w-[10.73%]' style={{backgroundColor: green[500]}}>

              </div>
              <div className='w-[9.4%]' style={{backgroundColor: blue[500], borderTopRightRadius: '5px', borderBottomRightRadius: '5px'}}>

              </div>
            </div>
          </div>
          
          <div style={{borderRadius: '10px', borderWidth: '3px', borderStyle:'solid', borderColor: theme.palette.primary.main, marginBlockEnd: theme.spacing(3)}}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{loanType}</Typography>
              </AccordionSummary>
              
                {credit.map((c:string, i:number) => {
                  if (loanType === c) {
                    return null; 
                  }
                  return (  
                      <AccordionDetails 
                      onClick={() => {
                        setLoanType(c)
                      }}
                        key={i} 
                        sx={{paddingBlockEnd: theme.spacing(2)}}>
                        <Typography>
                          {c}
                        </Typography> 
                      </AccordionDetails>
                  )
                })}

              
            </Accordion>
          </div>


          <div className='flex flex-col ' style={{marginBlockEnd: theme.spacing(3)}}>

            <div className='flex flex-row items-center' style={{marginBlockEnd: theme.spacing(2)}}>
              
              <div className='w-1/2'>
                <Typography variant='body1' sx={{}} className=''>
                  Placeholder
                </Typography>
              </div>
              <div className='w-1/2' style={{borderRadius: '10px', borderWidth: '3px', borderStyle:'solid', borderColor: theme.palette.primary.main,}}>
                <div className='text-center'>
                  <Typography variant='h6' sx={{}} className='text-bold'>
                    $X,XXX
                  </Typography>
                </div>
              </div>

              


            </div>

            <div className='flex flex-row items-center' style={{marginBlockEnd: theme.spacing(2)}}>
            
              <div className='w-1/2 '>
                <Typography variant='body1' sx={{}} className=''>
                  Placeholder
                </Typography>
              </div>
              <div className='w-1/2'>
                <div className='text-center' style={{borderRadius: '10px', borderWidth: '3px', borderStyle:'solid', borderColor: theme.palette.primary.main,}}>
                  <Typography variant='h6' sx={{}} className='text-bold'>
                    $X,XXX
                  </Typography>
                </div>
              </div>   

            </div>

            <div className='flex flex-row items-center' style={{marginBlockEnd: theme.spacing(2)}}>

              <div className='w-1/2'>
                <Typography variant='body1' sx={{}} className=''>
                  Placeholder
                </Typography>
              </div>
              <div className='w-1/2'>
                <div className='text-center' style={{borderRadius: '10px', borderWidth: '3px', borderStyle:'solid', borderColor: theme.palette.primary.main,}}>
                  <Typography variant='h6' sx={{}} className='text-bold'>
                    $X,XXX
                  </Typography>
                </div>
              </div>

            </div>

          </div>

          <div>
            <Typography variant='body2' sx={{}} className='text-center'>
              Disclaimer: The average personal loan amount is based on data from TranUnion. The 5 year personal loan APRS are estimated based on loan amount of $8,085 and FICO scores between 300 and 850. Calculators were made using the Bankrate calculator on Oct 6, 2022.
            </Typography>
          </div>

        </div>
    </div>
  )
}

export default CreditScoreCostToYouCalculator