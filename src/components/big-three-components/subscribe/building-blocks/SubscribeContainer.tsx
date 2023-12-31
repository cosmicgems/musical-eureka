import DynamicMobileUserChip from '@components/User/DynamicMobileUserChip';
import UserCard from '@components/User/UserCard';
import { Alert, AlertTitle, Button, TextField } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import axios from 'axios';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import SubscriberInput from './SubscriberInput';
import AuthBox from './AuthBox';
import SubscriberAlerts from './SubscriberAlerts';

const SubscribeContainer = ({user}) => {

    const router = useRouter();
    
    const [blank, setBlank] = useState<boolean>(true)
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [values, setValues] = useState<any>({
        successMessage:"",
        success: null,
        errorMessage: "",
        error: null,
        sending: null,
        sent: null,
    });

    const [subscriber, setSubscriber] = useState({
        first_name: "",
        last_name: "",
        email: ""
    });

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

    useEffect(() => {

        if(loggedIn){return}

        if(!loggedIn){
            const fetchSession = async () => {
                if (user === undefined || user === null) {
                
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
                    <> 
                        <div className='flex  sm:mt-20 sm:pt-8 w-full gap-12 justify-space items-center px-3  '>

                            <div className='flex flex-col w-full sm:w-3/4 p-0 justify-center items-center '>
                                {
                                    !loggedIn &&
                                        <SubscriberInput 
                                            handleSubscribe={handleSubscribe}
                                            subscriber={subscriber}
                                            setSubscriber={setSubscriber}
                                            blank={blank}
                                            />
                                }
                            </div>

                            <AuthBox 
                                loggedIn={loggedIn}
                                handleSignin={handleSignin}
                                handleSignOut={handleSignOut}
                                handleSignup={handleSignup}
                                />

                        </div>

                    </>

                : values.sent &&

                    <div className='flex  sm:mt-20 md:pt-8 w-full gap-12 justify-space items-center px-3'>
                        
                        <SubscriberAlerts values={values} subscriber={subscriber} />

                        <AuthBox 
                                loggedIn={loggedIn}
                                handleSignin={handleSignin}
                                handleSignOut={handleSignOut}
                                handleSignup={handleSignup}
                                />

                    </div>
            }
        
        </>

    )
}

export default SubscribeContainer