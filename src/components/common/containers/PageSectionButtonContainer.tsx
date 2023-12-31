import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

const PageSectionButtonContainer = ({children, open}) => {
    return (
        
        <Box
        sx={{
            bgcolor: grey[900]
        }}
        className={open ? "rounded-tl" : "rounded-l"}
        >   
            {children}
        </Box>

    )
}

export default PageSectionButtonContainer