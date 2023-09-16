import React from 'react'
import { Box, TextField, Fab, Grid, Button,  } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import { grey } from '@mui/material/colors'



const Subscribe = () => {
    const [subscriber, setSubscriber] = useState('')


    return (
        <div className='flex mt-6 sm:mt-20 w-full gap-12 justify-space items-center px-3'>
            <div className='flex w-full sm:w-3/4 p-0'>
                <TextField size='small' fullWidth variant='outlined' sx={{bgcolor:grey[50], borderTopLeftRadius: '5px', borderBottomLeftRadius: "5px", borderTopRightRadius: "0px", borderBottomRightRadius:"0px"}} label="Subscribe Now" className='' value={subscriber} onChange={(e)=> {setSubscriber(e.target.value)}} />
                <Button variant='contained' sx={{borderTopLeftRadius:0, borderBottomLeftRadius:0,}}>
                    SubScribe
                </Button>
            </div>
            <div   className='sm:w-1/4 sm:flex gap-3 justify-end hidden '>
                <Button variant='contained' sx={{}} className=''>
                    Login
                </Button>
                <Button variant='outlined' sx={{}} className=''>
                    Signup
                </Button>
            </div>
        </div>
    )
}

export default Subscribe