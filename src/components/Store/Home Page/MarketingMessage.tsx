import { Box, Typography } from '@mui/material'
import React from 'react'

const MarketingMessage = ({data}) => {
    const {title, message, photo, titleColor, bgColor, textColor} = data
  return (
    <Box className=' sm:px-3 py-6 '>
        <Box sx={{boxShadow: {sm:'2px 2px 4px 2px #c2c2c2'}, bgcolor:{sm:bgColor}, }} className=" rounded-lg sm:p-3 sm:mr-3 flex">
            <div className='flex flex-col justify-center items-center sm:gap-3'>
                <Typography variant='h3' component="div" sx={{textShadow: "1px  #EEE ", fontSize:{xs:"2.0rem", sm:"3.0rem"}}} className={titleColor ? `${titleColor} w-full ` : "w-full" }>
                    {title}
                </Typography>
                <Typography variant='h6' component="div" sx={{color:{sm:textColor}, }} className=''>
                    {message}
                </Typography>
            </div>
        </Box>        
    </Box>

  )
}

export default MarketingMessage