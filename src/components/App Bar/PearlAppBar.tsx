import React, { useState } from 'react'
import AppBarContainer from './AppBarContainer'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import MinimizeRoundedIcon from '@mui/icons-material/MinimizeRounded';
import { green, red } from '@mui/material/colors';
import { Button, Typography } from '@mui/material';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import { PageSectionButtonContainer } from '@components/common';

const PearlAppBar = () => {

  const [open, setOpen] = useState<boolean>(true)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleDisplay = () => {
    if (open){
      return handleClose()
    } else {
      return handleOpen()
    }
  }

  return (
    <div className='w-full'>
      <div
      className='w-full flex justify-end'
      >
        <PageSectionButtonContainer
        open={open}
        >
          <Button
          onClick={handleDisplay}
          className='justify-center items-center'
          >
            <Typography variant='h6' className='mr-2 gradient-text-home'>{!open && "Pearl Bar"}</Typography>{open ? <MinimizeRoundedIcon sx={{color: red[600]}} /> : <ControlPointRoundedIcon sx={{color: green[600]}} />}
          </Button>          
        </PageSectionButtonContainer>

      </div>

      {
        open && 
        <AppBarContainer />
      }
        
    </div>
  )
}

export default PearlAppBar