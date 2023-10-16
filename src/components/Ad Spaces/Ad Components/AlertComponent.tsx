import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

const AlertComponent = ({data}) => {

    const { values } = data;

  return (
    <Box sx={{bgcolor:grey[900]}} className="p-3">
        
        <div className={`flex justify-center items-center text-center`}>

            <Typography variant='body1' className={`${values.sending ? "gradient-text-five font-bold text-5xl" : values.success ? "gradient-text-four text-xl" : values.error ? "gradient-text-three  text-xl" : ""}`} sx={{}} >
                {values.sending ? 
                "Sending..."
                :
                values.success ?
                values.successMessage
                :
                values.error ?
                values.errorMessage
                :
                null
                }
            </Typography>

        </div>

    </Box>
  )
}

export default AlertComponent