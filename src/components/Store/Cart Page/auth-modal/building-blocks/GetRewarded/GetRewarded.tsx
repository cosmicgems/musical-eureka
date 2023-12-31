import { Box, Button, ButtonGroup, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

const GetRewarded = ({setStartAuthorize, startAuthorize, setGetRewarded, getRewarded, style}) => {
  return (
    <Box sx={style} className="rounded flex flex-col gap-3">
        <Typography id="modal-modal-title" variant="h4" className='gradient-text text-center' component="h2" sx={{}}>
            Get Rewarded?
        </Typography>
        <Typography id="modal-modal-description"  sx={{ mt: 2, color:grey[50] }}>
            Get Free Shipping and other rewards when you join <span className='gradient-text'>Pearl Box</span>.
        </Typography>
        <ButtonGroup variant='text' className='w-full'>
            <Button className='gradient-text-three w-full' href='/api/store/checkout' onClick={()=>{}} sx={{borderColor: grey[50]}}>
                Continue as Guest
            </Button>
            <Button className='gradient-text-four w-full' onClick={()=>{setGetRewarded(!getRewarded); setStartAuthorize(!startAuthorize)}}  sx={{borderColor: grey[50]}}>
                Log In to Account
            </Button>
        </ButtonGroup>
    </Box>
  )
}

export default GetRewarded