import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import { Button, TextField, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';


const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
    color: green[200],
    },
    '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
    '& fieldset': {
        borderColor: grey[50],
    },
    '&:hover fieldset': {
        borderColor: grey[50],
    },
    '&.Mui-focused fieldset': {
        borderColor: grey[50],
    },
    '& .MuiInputBase-input': { 
        color: grey[50], 
    },
    },
    '& label': { // Add this selector for unfocused label
        color: grey[50], // Change this to the desired label color
    },
});


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const SignupModal = ({handleSetSignup}) => {
    const [emailUsername, setEmailUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

  return (
    <div className='flex flex-col gap-3'>
        
        <div className='flex flex-col '>
            <Typography id="modal-modal-title" variant="h5" className='gradient-text text-center' component="div" sx={{}}>
                Pearl Box
            </Typography>

            <Typography id="modal-modal-title" variant="h6" className='gradient-text text-center' component="div" sx={{}}>
                Sign Up
            </Typography>            
        </div>

        
            <div className='flex flex-col gap-3'>
                <CssTextField 
                fullWidth
                value={emailUsername} 
                onChange={(e)=>{setEmailUsername(e.target.value);}} 
                variant='outlined' 
                label="Email or username" />
                <CssTextField 
                fullWidth
                value={password} 
                onChange={(e)=>{setPassword(e.target.value);}} 
                variant='outlined' 
                label="Password" />
                
                <Button onClick={handleSetSignup}>
                    Already have an account? Login!
                </Button>
                
                <Button size='large' variant='outlined' sx={{}} fullWidth className=''>
                    Sign Up
                </Button>
            </div>
            
    </div>
  )
}

export default SignupModal