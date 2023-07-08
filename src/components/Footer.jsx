import React from 'react'
import { Facebook, Instagram, YouTube, Telegram, Twitter, WhatsApp } from '@mui/icons-material'



const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2023 PEARL BOX CO All rights reserved</p>
      <p className='icons'>
        <Facebook/>
        <Instagram/>
        <YouTube />
        <Telegram />
        <WhatsApp />
        <Twitter/>
      </p>
    </div>
  )
}

export default Footer