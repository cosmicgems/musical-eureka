import React from 'react'
import { Facebook, Instagram, YouTube, Telegram, Twitter, WhatsApp } from '@mui/icons-material'
import { useStateContext } from '../../Context/StateContext';
import { blue, grey, lightBlue, green, lightGreen, deepPurple, orange, yellow, } from '@mui/material/colors';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';



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

  const footerIconColor = pageSegmentColors[pathSegment] || grey[900];
  return (
    <div className='footer-container'>
      <Typography variant='p' component='div' sx={{color: footerIconColor}}>2023 PEARL BOX CO All rights reserved</Typography>
      <p className='icons'>
      <Link href='https://www.facebook.com/pearlboxandco' target="_blank">
        <Button>
          <Facebook sx={{color: footerIconColor}}/>
        </Button>
      </Link>
      <Link target='_blank' href='https://instagram.com/pearlboxandco?igshid=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr'>
        <Button>
          <Instagram sx={{color: footerIconColor}}/>
        </Button>        
      </Link>

      <Link target='_blank' href='https://www.youtube.com/channel/UCF_QOiSVYqteXK1_xIb2lIw'>
        <Button>
          <YouTube sx={{color: footerIconColor}}  />
        </Button>        
      </Link>

        
      </p>
    </div>
  )
}

export default Footer