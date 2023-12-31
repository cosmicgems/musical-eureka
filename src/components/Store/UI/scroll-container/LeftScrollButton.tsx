import { Button } from '@mui/material'
import React from 'react'
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import { teal } from '@mui/material/colors';


const LeftScrollButton = ({handleHeroNav}) => {
  return (
    <div className='hidden lg:flex absolute z-30'>
        <Button className='' sx={{color: teal[200],}}   onClick={handleHeroNav}>
          <ArrowCircleLeftRoundedIcon sx={{fontSize: "5rem"}} />
        </Button>
    </div>
  )
}

export default LeftScrollButton