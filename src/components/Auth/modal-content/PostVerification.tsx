import React, { useState, FormEventHandler, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { Box, Button, TextField, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import Loading from '@components/Loading';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';


interface Session {
    data:{
        user:{
            about: string;
            confirmed_account: boolean;
            createdAt: Date;
            email: string;
            first_name: string;
            last_name: string;
            password: string;
            photo: string;
            role: number;
            updatedAt: Date;
            username: string;
            verification_token: string;
            verification_token_expiration: string;
            _id: string;
            
        }      
    },
    status: string;

}

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
    bgcolor: grey[900],
    boxShadow: 24,
    p: 4,
};

const PostVerificationModal = ({from, path}) => {

    const {data:session, status} = useSession() as Session;
    const [emailUsername, setEmailUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const router = useRouter();

    const handleLogin = async () => {
        if(from === "store") {
            router.push(`${path}`)
        }
    }

    useEffect(() => {
        console.log(status);
        
        if(status === "authenticated"){
            handleLogin();
        }
    }, [status])

    const handleSignIn = async(e:any) => {
        e.preventDefault()
        try {
            await signIn('credentials', {
                emailLogin:emailUsername, passwordLogin: password
            });   
        } catch (error) {
            console.error(error)
        }

    }






  return (
    <Box sx={style} className="rounded flex flex-col gap-3">
        <div className='flex flex-col gap-3'>
            
            <div className='flex flex-col '>
                <Typography id="modal-modal-title" variant="h5" className='gradient-text text-center' component="div" sx={{}}>
                    Pearl Box
                </Typography>

                <Typography id="modal-modal-title" variant="h6" className='gradient-text text-center' component="div" sx={{}}>
                    Login
                </Typography>            
            </div>

            <form className='flex flex-col gap-3'>
                <CssTextField 
                fullWidth
                value={emailUsername} 
                onChange={(e)=>{setEmailUsername(e.target.value);}} 
                variant='outlined' 
                label="Email or username" />
                <CssTextField 
                fullWidth
                type='password'
                value={password} 
                onChange={(e)=>{setPassword(e.target.value);}} 
                variant='outlined' 
                label="Password" />
                

                
                <Button  size='large' variant='outlined' sx={{}} onClick={(e) => {handleSignIn(e)}} fullWidth className=''>
                    Login
                </Button>
            </form>




        </div>
    </Box>

  )
}

export default PostVerificationModal