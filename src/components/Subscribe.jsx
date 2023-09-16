import React from 'react'
import { Box, TextField, Fab, Grid, Button,  } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'



const Subscribe = ({color, }) => {
    const [email, setEmail] = useState('')


    return (
        <Box sx={{}} >
            <Grid container sx={{}} spacing={2}>
                <Grid item sx={{}} md={10}>
                    <TextField fullWidth sx={{}} variant='outlined' value={email} size='small'  label="Subscribe Now!" onChange={(e) => setEmail(e.target.value)}  />
                </Grid>
                <Grid item sx={{}} md={2}>
                    <Button sx={{}} type='submit'  variant='outlined'>
                        Subscribe
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Subscribe