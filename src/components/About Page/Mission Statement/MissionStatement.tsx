import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import Typewriter from 'typewriter-effect'; 

const MissionStatement = () => {
  return (
    <div className='px-3  md:px-3 '>
      <Box sx={{bgcolor: grey[800], borderRadius:'5px'}} className="py-3 px-6 h-full" >

          <Typography  variant='h3' className=' gradient-text-four w-full text-center' sx={{}}>
              Mission Statement
          </Typography>
          <Typography variant='body1' className='' sx={{color:grey[50], fontSize:"1.25rem"}}>
              <Typewriter
              
                options={{
                  strings: ['Pearl Box was founded with a singular goal in mind: to be the go-to platform for individuals aspiring to cultivate a lifestyle worth living. Our inception stemmed from the vision of creating a centralized hub that seamlessly integrates technology, success, health and wellness, and overall balance.', 
                  'Guided by our core values of passion, purpose, innovation, growth, integrity, impact, simplicity, and balance, every decision we make at Pearl Box is anchored in our commitment to offering curated content and products that enhance the lives of our users.',
                  'We strive to empower individuals in their journey towards holistic well-being and personal fulfillment, providing a space where technology converges harmoniously with the pursuit of a balanced and fulfilling life.',
                ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                }}
              /> 
          </Typography>

      </Box>
    </div>

  )
}

export default MissionStatement