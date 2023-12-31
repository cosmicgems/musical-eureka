import { Button } from '@mui/material'
import React from 'react'
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import { teal } from '@mui/material/colors';


const RightScrollButton = ({handleHeroNav}) => {
  return (
    <div className='hidden lg:flex absolute right-0 z-30'>
        <Button className='' sx={{color: teal[200],}}   onClick={handleHeroNav}>
          <ArrowCircleRightRoundedIcon sx={{fontSize: "5rem"}} />
        </Button>
    </div>
  )
}

export default RightScrollButton