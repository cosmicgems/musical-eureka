import { Box } from '@mui/material'
import React from 'react'
import AuthBoxBtn from './AuthBoxBtn'
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { grey } from '@mui/material/colors';
import { Session } from 'src/utility/types/Session';

const AuthBoxContainer = ({ user }) => {
    const { data: session, status } = useSession() as Session;


    // console.log(user);
    

    const router = useRouter();
    const loginSx = {border:"none", color: grey[900], fontWeight: "bold"};
    const signupSx = {p:"3px", border: "none"}

    const handleSignin = async (e: any) => {
        e.preventDefault();
        router.push("/auth/login");
    };

    const handleSignup = async (e: any) => {
        e.preventDefault();
        router.push("/auth/signup");
    }

    const handleAuth = async (e: Event, type) => {
        e.preventDefault()
        if( type === "login" ) {

            handleSignin(e);

        } else if ( type === "sign-up" ) {
            
            handleSignup(e);

        } else {
            await signOut();
        }
    }

    return (

        <Box  className="ml-2 flex " >
            
            <div className='flex gap-3'>
                {
                    status === "unauthenticated" || status === "loading" ?
                        <div className='flex gap-3 grow md:grow-0'>

                            <AuthBoxBtn
                            variant="contained"
                            name="Login"
                            type="login"
                            className={`gradient-button`}
                            sx={loginSx}
                            handleAuth={handleAuth}
                            />

                            <AuthBoxBtn
                            variant="outlined"
                            name="Sign Up"
                            type="sign-up"
                            className={`gradient-button-signup grow md:grow-0 `}
                            sx={signupSx}
                            handleAuth={handleAuth}
                            />

                        </div>

                    :
                    <div className='flex gap-3'>
                        
                        <AuthBoxBtn
                        variant="contained"
                        name="Sign Out"
                        type="sign-out"
                        className={`gradient-button`}
                        sx={{}}
                        handleAuth={handleAuth}
                        />

                    </div>
                }                
            </div>

        </Box>

    )

}

export default AuthBoxContainer