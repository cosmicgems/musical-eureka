import { Box, Typography } from '@mui/material'
import { amber, green, grey, red } from '@mui/material/colors'
import React from 'react'

const SendingStatus = ({values}) => {

    const { success, successMessage, error, errorMessage, sending} = values;

    return (
        <div>
            { sending ?
                <Box className="p-3 mb-3" sx={{bgcolor: amber[600], borderRadius: "10px", fontSize: '2rem'}}>
                    <Typography variant='h4' sx={{}} className=''>
                        Sending...
                    </Typography>
                </Box>
                :
                success ?
                <Box sx={{bgcolor:green[400], borderRadius: "10px", fontSize: '2rem'}} className="p-3 mb-3">
                    <Typography variant='h4' sx={{color:grey[50]}} className='font-bold'>
                        {successMessage}
                    </Typography>
                </Box>   
                :
                error ?
                <Box sx={{bgcolor:red[700], borderRadius: "10px", fontSize: '2rem'}} className="p-3 mb-3">
                    <Typography variant='h4' sx={{color: grey[200]}} className='font-bold'>
                        {errorMessage}
                    </Typography>
                </Box> 
                :
                <div className='w-full p-3 mb-3'>
                    <Typography variant="h3" className='font-bold w-full text-center gradient-text-subcategories' sx={{}}>
                        Create A Post
                    </Typography>
                </div>
            }
        </div>
    )
}

export default SendingStatus