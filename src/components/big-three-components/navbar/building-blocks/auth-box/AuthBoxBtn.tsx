import { Box, Button, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

const AuthBoxBtn = ({ 
    variant, 
    name, 
    type, 
    className, 
    sx, 
    handleAuth,
}) => {

    return (
        <>
            {
                type === "sign-up" ?
                    <Button 
                    onClick={ (e) => { handleAuth(e, type ) } } 
                    variant={variant}
                    className={className}
                    sx={sx}
                    size='small'
                    >

                        <Box sx={{bgcolor:grey[900], p: 1, borderRadius: "4px"}}>

                                <Typography sx={{lineHeight: 0.85}}  className={`gradient-text-button`}>
                                    {name}
                                </Typography>

                        </Box>

                    </Button>
                :
                    <Button 
                    size='small'
                    onClick={ (e) => { handleAuth(e, type ) } } 
                    variant={variant}
                    className={`${className}`}
                    sx={sx}
                    >
                                
                        <Typography sx={{lineHeight: 0.85, fontWeight: "bold"}}  >
                            {name}
                        </Typography>

                    </Button>
            }
        </>


    )

}

export default AuthBoxBtn