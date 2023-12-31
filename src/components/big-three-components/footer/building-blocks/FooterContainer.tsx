import { Typography } from '@mui/material'
import { blue, deepPurple, green, grey, lightBlue, orange, yellow } from '@mui/material/colors';
import { useStateContext } from 'Context/StateContext';
import React from 'react'
import FooterIconsContainer from './FooterIconsContainer';


export const footerIconColor = grey[900];

const FooterContainer = () => {

  const pageSegmentColors = {
      technology: blue[900], 
      realty: yellow[600],
      health: lightBlue[200],
      intelligence: orange[500],
      community: deepPurple[400],
      finance: green[500]
    };


  return (
    <div className='footer-container'>

      <Typography variant='caption' component='div' sx={{color: footerIconColor}}>2023 PEARL BOX CO&copy; All rights reserved</Typography>
      
      <FooterIconsContainer  />
      
    </div>
  )
}

export default FooterContainer