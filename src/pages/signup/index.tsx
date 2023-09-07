import { Box, Button, TextField, Typography } from '@mui/material'
import { green, grey } from '@mui/material/colors'
import React, { useState } from 'react'

const SignupPage = () => {

    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [userName, setUsername] = useState<string>();
    const [birthDate, setBirthDate] = useState<any>({
        month: 0,
        day: 0,
        year: 0
    });


  return (
    <div className='h-screen'>

        <Box sx={{bgcolor: grey[200]}} className=' flex flex-col justify-center items-center  min-h-screen gap-6'>

            <div>
                <Typography className='font-bold ' sx={{color: green[500]}} variant='h1' >
                    Signup 
                </Typography>
            </div>

            <Box sx={{bgcolor: grey[400], borderRadius: '10px'}} className="md:w-1/5 flex flex-col gap-6" >
                
                <Box sx={{bgcolor: grey[600], borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}} className='text-center flex flex-col gap-1 py-3 px-6'>
                    <Typography variant='h3' sx={{color:green[400]}} className='font-bold'>
                       Pearl Box
                    </Typography>
                    <Typography variant='body1' sx={{color:green[400]}} className=''>
                        Cultivating a lifestyle worth living.
                    </Typography>
                </Box>

                <div className=' pb-3 px-6'>
                    <form className='flex flex-col gap-3'>
                        
                        <div>
                            <TextField fullWidth sx={{}} value={firstName} className='' onChange={(e)=> setFirstName(e.target.value)} variant='outlined' label="First Name" /> 
                        </div>
                        <div>
                            <TextField fullWidth sx={{}} value={lastName} className='' onChange={(e)=> setLastName(e.target.value)} variant='outlined' label="Last Name" />
                        </div>
                        <div>
                            <TextField fullWidth type='email' sx={{}} value={email} className='' onChange={(e)=> setEmail(e.target.value)} variant='outlined' label="Email" />
                        </div>
                        <div>
                            <TextField fullWidth sx={{}} value={userName} className='' onChange={(e)=> setUsername(e.target.value)} variant='outlined' label="Username" />
                        </div>

                        <div className='flex justify-center items-center'>
                            <Button variant='contained' sx={{bgcolor: green[500]}} className=''>
                                Sign up
                            </Button>
                        </div>



                    </form>
                </div>

            </Box>

        </Box>

    </div>
  )
}

export default SignupPage