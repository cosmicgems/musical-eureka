import theme from '../../../../styles/theme/lightThemeOptions'
import { Button, Typography } from '@mui/material'
import React from 'react'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import ProcessCarousel from '../../Process/ProcessCarousel';

const UnderstandCreditRepair = () => {
  return (
    <div className='text-center' style={{padding: theme.spacing(3)}}>

        <div style={{marginBlockEnd: theme.spacing(3)}}>
            <Typography variant='h3' sx={{}} className=''>
                Understanding The Credit Repair Process
            </Typography>
        </div>
        <div style={{marginBlockEnd: theme.spacing(3)}}>
            <ProcessCarousel/>
        </div>
        <div style={{marginBlockEnd: theme.spacing(3)}}>
            <Button variant='contained' sx={{}} className=''>
                Start today
            </Button>
        </div>
        <div>
            <Typography variant='body1' sx={{}} className=''>
                Or get a FREE credit report consultation
            </Typography>
        </div>

    </div>
  )
}

export default UnderstandCreditRepair