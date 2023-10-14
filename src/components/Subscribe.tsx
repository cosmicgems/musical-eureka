import React, { useEffect } from 'react'
import { Box, TextField, Fab, Grid, Button, Alert, AlertTitle, Stack  } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import { grey, red } from '@mui/material/colors'
import axios from 'axios'
import { useRouter } from 'next/router'
import { getSession, signOut } from 'next-auth/react'
import UserCard from './User/UserCard'


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

const Subscribe = ({user}) => {
    console.log(user);
    

    const router = useRouter();

    const [subscriber, setSubscriber] = useState({
        first_name: "",
        last_name: "",
        email: ""
    });

    const [values, setValues] = useState<any>({
        successMessage:"",
        success: null,
        errorMessage: "",
        error: null,
        sending: null,
        sent: null,
    });
    
    const [blank, setBlank] = useState<boolean>(true)
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(()=>{
        if(blank){
            if(subscriber.email !== ""){
                setBlank(!blank);
            }
        } else if (!blank){
            if(subscriber.email === ""){
                setBlank(!blank);
            }
        }
    }, [blank, subscriber.email]);



    const handleSubscribe = async(e) => {
        e.preventDefault();
        setValues((prevValues) => ({
        ...prevValues,
        sending: true,
        }));
        
        try {
            const res = await axios.post("/api/auth/signup/subscribe", { subscriber });
            setValues((prevValues) => ({
            ...prevValues,
            successMessage: res.data.message,
            success: true,
            sending: false,
            sent: true,
            }));
            console.log(values);
        } catch (error) {
            console.log(error);
            setValues((prevValues) => ({
            ...prevValues,
            errorMessage: `There was an error subscribing you`,
            error: true,
            }));
        }




        setTimeout(()=> {
            setValues((prevValues)=>({
                ...prevValues,
                successMessage: "", success: null,
                errorMessage:"", error: null,
                sending: false,
            }))
        }, 5000);
        
    }

    const handleSignin = (e) => {
        e.preventDefault();
        router.push("/auth/login");
    };
    const handleSignOut = async (e) => {
        await signOut()
    }
    const handleSignup = (e) => {
        e.preventDefault();
        router.push("/auth/signup");
    }
    useEffect(() => {
        if(loggedIn){return}

        if(!loggedIn){
        const fetchSession = async () => {
            if (user === undefined || user === null) {
            // User is logged in
                setLoggedIn(false);
            } else {
                setLoggedIn(true);
            }
        };
    
        fetchSession();            
        }

      }, [user, setLoggedIn, loggedIn]);

    return (
        <>
            {
                !values.sent && !values.sending  ?
                    <div className='flex  sm:mt-20 w-full gap-12 justify-space items-center px-3'>
                        <div className='flex flex-col w-full sm:w-3/4 p-0 justify-center items-center'>
                            {
                                !loggedIn ?
                                    <div className='flex sm:w-1/2 justify-center'>
                                        <TextField size='small' fullWidth variant='outlined' sx={{bgcolor:grey[50], borderTopLeftRadius: '5px', borderBottomLeftRadius: "5px", borderTopRightRadius: "0px", borderBottomRightRadius:"0px"}} label="Email" className='' value={subscriber.email} onChange={(e)=> {setSubscriber({...subscriber,email:e.target.value})}} />
                                        <Button className='gradient-button' onClick={(e)=>handleSubscribe(e)} variant='contained' sx={{borderTopLeftRadius:0, borderBottomLeftRadius:0, color:grey[900]}}>
                                            Subscribe
                                        </Button>                
                                    </div>
                                :
                                null
                            }

                            {
                                blank ?
                                null :
                                <div className='sm:w-1/2 flex gap-3 pt-3'>
                                    <TextField size='small' fullWidth variant='outlined' sx={{bgcolor:grey[50], borderTopLeftRadius: '5px', borderBottomLeftRadius: "5px", borderTopRightRadius: "0px", borderBottomRightRadius:"0px"}} label="First Name" className='' value={subscriber.first_name} onChange={(e)=> {setSubscriber({...subscriber,first_name:e.target.value})}} />
                                    <TextField size='small' fullWidth variant='outlined' sx={{bgcolor:grey[50], borderTopLeftRadius: '5px', borderBottomLeftRadius: "5px", borderTopRightRadius: "0px", borderBottomRightRadius:"0px"}} label="Last Name" className='' value={subscriber.last_name} onChange={(e)=> {setSubscriber({...subscriber,last_name:e.target.value})}} />
                                </div>                    
                            }

                        </div>
                        <div   className='sm:w-1/5 hidden sm:block'>
                            { loggedIn ? 
                                <div className=' sm:flex gap-3 justify-end hidden sm:block '>
                                    <UserCard user={user}  />
                                    <div>
                                        <Button onClick={(e)=> handleSignOut(e)} variant='outlined' sx={{borderColor: red[500], color: red[500]}} className=''>
                                            Signout
                                        </Button>                                        
                                    </div>

                                </div>
                                :
                                <div className=' sm:flex gap-3 justify-end hidden '>
                                    <Button onClick={(e)=>handleSignin(e)} variant='contained' sx={{color:grey[900]}} className='gradient-button'>
                                        Login
                                    </Button>
                                    <Button onClick={(e)=>handleSignup(e)} variant='outlined' sx={{border: 'none', color:grey[900]}} className='gradient-button-signup'>
                                        Signup
                                    </Button>
                                </div>
                            }

                        </div>
                    </div>
                : values.sent ?

                <div className='flex mt-12 sm:mt-20 w-full gap-12 justify-space items-center px-3'>
                    
                    <div className='flex flex-col w-full sm:w-3/4 p-0'>
                        {
                            values.error  ?
                                <Alert severity="error">
                                    <AlertTitle>Error</AlertTitle>
                                    {values.errorMessage} {subscriber.first_name}. <strong>Please feel free to try again.</strong>
                                </Alert>
                                : null
                        }
                        {
                            values.success  ?
                                <Alert severity="success">
                                    <AlertTitle>Success</AlertTitle>
                                    {values.successMessage} {subscriber.first_name}. <strong>We&apos;re happy you&apos; here! </strong>
                                </Alert>          
                                : null
                        }
                    </div>

                    <div   className='sm:w-1/4 sm:flex gap-3 justify-end hidden '>
                        <Button onClick={(e)=>handleSignin(e)} variant='contained' sx={{}} className=''>
                            Login
                        </Button>
                        <Button onClick={(e)=>handleSignup(e)} variant='outlined' sx={{}} className=''>
                            Signup
                        </Button>
                    </div>
                </div>
                : null
            }
        </>

    )
}

export default Subscribe