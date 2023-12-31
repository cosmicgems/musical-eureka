import { Box, Button, TextField, Typography } from '@mui/material'
import { green, grey, red } from '@mui/material/colors'
import React, { useState, FormEventHandler, useEffect } from 'react'
import { signIn, useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import { alpha, styled } from '@mui/material/styles';
import validator from 'validator';
import axios from 'axios';
import { getToken } from 'next-auth/jwt'
import { getSession } from 'next-auth/react'
import { Layout } from '@components/big-three-components'
import Loading from '../../components/Loading'


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
    color: green[500],
    },
    '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
    '& fieldset': {
        borderColor: grey[900],
    },
    '&:hover fieldset': {
        borderColor: grey[600],
    },
    '&.Mui-focused fieldset': {
        borderColor: grey[600],
        borderWidth: "3px"
    },
    },
});

const LoginPage = () => {
    const {data:session, status} = useSession() as Session;

    const [emailLogin, setEmailLogin] = useState<string>("");
    const [passwordLogin, setPasswordLogin] = useState<string>("");
    const [invalidEmail, setInvalidEmail] = useState<boolean>(null);
    const [invalidPassword, setInvalidPassword] = useState<boolean>(null);
    const [validationErrorMessage, setValidationErrorMessage] = useState<any>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        username: ""
    })
    const [touched, setTouched] = useState<any>({
        firstName: false,
        lastName: false,
        username: false,
        email: false,
        confirmEmail: false,
        password: false,
        confirmPassword: false,
    })
    const [user, setUser] = useState<any>(null);



    const router = useRouter();

    useEffect(() => {
        if(status === "authenticated"){
            router.push("/")
        }
    })

    const handleSubmit:FormEventHandler<HTMLFormElement> = async(e:any) => {
        e.preventDefault()
        try {
            await signIn('credentials', {
                emailLogin, passwordLogin
            });   
        } catch (error) {
            console.error(error)
        }

    }

    const button = "Login";


    if(status === "loading"){
        return <Loading />
    }

    
    if(status === "unauthenticated") {
        return (
            <div className=''>

                <Box sx={{bgcolor: grey[800]}}>
                    <Layout>
                        <div className=' flex flex-col justify-center items-center  min-h-[30vh] gap-6 sm:pt-6 px-3 sm:px-0' >

                            <Box sx={{bgcolor: grey[200], borderRadius: '10px'}} className=" w-full md:w-2/5 flex flex-col gap-6  " >
                                
                                <Box sx={{bgcolor: grey[900], borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}} className='text-center flex flex-col gap-1 py-3 px-6'>
                                    <div>
                                        <Typography className='font-bold gradient-text-two ' sx={{}} variant='h3' >
                                            Login
                                        </Typography>
                                    </div>
                                    <Typography variant='h3' sx={{}} className='font-bold gradient-text-two'>
                                        Pearl Box
                                    </Typography>
                                    <Typography variant='body1' sx={{color:green[400]}} className='gradient-text-two'>
                                        Cultivating a lifestyle worth living.
                                    </Typography>
                                </Box>

                                <div className=' pb-3 px-6'>
                                    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                                        


                                                <div>
                                                    {validationErrorMessage.email}
                                                    <CssTextField fullWidth type='email' value={emailLogin} className='' onChange={(e)=>{ const value = e.target.value; setEmailLogin(value);
                                                            setTouched({email:true}); }} variant='outlined' label="Email"
                                                        error={invalidEmail}
                                                        helperText={invalidEmail ? validationErrorMessage.email : ''}
                                                        sx={{
                                                            '& .MuiOutlinedInput-root': {
                                                            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: red[500], // Change border color when there is an error
                                                            },
                                                            },
                                                        }}
                                                        />
                                                </div>               


                                            <div>
                                                <CssTextField fullWidth type='password' value={passwordLogin} className='' onChange={(e)=>{ setPasswordLogin(e.target.value);
                                                        setTouched({password:true});}} variant='outlined' label="Password" 
                                                    error={invalidPassword}
                                                    helperText={invalidPassword ? validationErrorMessage.password : ''}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: red[500], // Change border color when there is an error
                                                        },
                                                        },
                                                    }}
                                                    />
                                            </div>     


                                            <div className='text-center'>
                                                <Button sx={{}} href='/auth/signup'>
                                                    Don&apos;t have an account?
                                                </Button>
                                            </div>

                                            <div className='flex justify-center items-center'>
                                                <Button onClick={()=>handleSubmit} type='submit' variant='contained' sx={{bgcolor: green[500]}} className=''>
                                                    {button}
                                                </Button>
                                            </div>


                                    </form>
                                </div>

                            </Box>

                        </div>

                        
                    </Layout>

                </Box>

            </div>
        )
    }


};

export default LoginPage