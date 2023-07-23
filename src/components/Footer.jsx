import React from 'react'
import { Facebook, Instagram, YouTube, Telegram, Twitter, WhatsApp } from '@mui/icons-material'
import { useStateContext } from '../../Context/StateContext';
import { blue, grey, lightBlue, green, lightGreen, deepPurple, orange, yellow, } from '@mui/material/colors';
import { Typography } from '@mui/material';



const Footer = () => {  
  const { pageSlug, pathSegment } = useStateContext();
  const pageSegmentColors = {
      technology: blue[900], // Example color for "tech" segment
      realty: yellow[600],
      health: lightBlue[200],
      intelligence: orange[500],
      community: deepPurple[400],
      finance: green[500]
    };

  const footerIconColor = pageSegmentColors[pathSegment] || '#000';
  return (
    <div className='footer-container'>
      <Typography variant='p' component='div' sx={{color: footerIconColor}}>2023 PEARL BOX CO All rights reserved</Typography>
      <p className='icons'>
        <Facebook sx={{color: footerIconColor}}/>
        <Instagram sx={{color: footerIconColor}}/>
        <YouTube sx={{color: footerIconColor}} />
        <Telegram  sx={{color: footerIconColor}}/>
        <WhatsApp sx={{color: footerIconColor}} />
        <Twitter sx={{color: footerIconColor}}/>
      </p>
    </div>
  )
}

export default Footer