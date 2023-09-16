import { Box, Button, TextField, Typography } from '@mui/material'
import { green, grey, red } from '@mui/material/colors'
import React, { useState, FormEventHandler, useEffect } from 'react'
import { signIn } from "next-auth/react"
import { useRouter } from 'next/router'
import { styled } from '@mui/material/styles';
import validator from 'validator';
import axios from 'axios';
import { getSession } from 'next-auth/react'


const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
    color: green[50],
    },
    '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
    '& fieldset': {
        borderColor: grey[900],
    },
    '&:hover fieldset': {
        borderColor: grey[50],
    },
    '&.Mui-focused fieldset': {
        borderColor: grey[50],
    },
    },
});

const LoginPage = () => {

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [emailLogin, setEmailLogin] = useState<string>("");
    const [confirmEmail, setConfirmEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordLogin, setPasswordLogin] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [signup, setSignup] = useState<boolean>(false);
    const [matchEmailError, setMatchEmailError] = useState<boolean>(null);
    const [matchPasswordError, setMatchPasswordError] = useState<boolean>(null);
    const [invalidFirstName, setInvalidFirstName] = useState<boolean>(null);
    const [invalidLastName, setInvalidLastName] = useState<boolean>(null);
    const [invalidUsername, setInvalidUsername] = useState<boolean>(null);
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

    useEffect(() => {
        handleValidation("first name", firstName);
        handleValidation("last name", lastName);
        handleValidation("username", username);
        handleValidation("email", email);
        handleValidation("email confirm", confirmEmail);
        handleValidation("password", password);
        handleValidation("confirm password", confirmPassword);
    }, [firstName, lastName, username, email, confirmEmail, password, confirmPassword]);

    // Use useEffect to trigger validation when lastName changes

    const router = useRouter();


    const handleSubmit:FormEventHandler<HTMLFormElement> = async(e:any) => {
        e.preventDefault();
        const res = await signIn('credentials', {
            emailLogin, passwordLogin
        });
    }

    const button = signup ? "Sign up" : "Login";

    const emailInUse = async() => {
        console.log(email, "this is up");
        
        const res = await axios.post('/api/auth/signup/email-check', {email});
        console.log(res);
        
        if (res.data.user){
            return true;
        } else if (!res.data.user) {
            return false;
        }
    }
    const usernameInUse = async() => {
        console.log(username);
        
        const res = await axios.post('/api/auth/signup/username-check', {username});
        console.log(res.data.user);
        
        if (res.data.user){
            return true;
        } else if (res.data.user === null) {
            return false;
        }
    }

    const handleValidation = async(field:string, value:string) => {

        const nameRegex = /^[a-zA-Z]+$/;

        const usernameRegex = /^[a-zA-Z0-9]+$/;
        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!*])[A-Za-z\d@#$%^&!*]{8,}$/;

        let user;
        let userEmail;

        switch (field) {
            case "first name":
                console.log(value);
                if(touched.firstName && value === ""){
                    if (!value.match(nameRegex) ) {
                        setInvalidFirstName(true);
                        setValidationErrorMessage({firstName: "Please only include letters in first name."})
                        if(value.length > 26 || value.length < 2){
                            setValidationErrorMessage({...validationErrorMessage ,firstName: "Please only include letters in first name field, and keep length at or between 2-26 characters."})
                        }
                    }                    
                } else {
                    setInvalidFirstName(false);
                    setValidationErrorMessage({...validationErrorMessage ,firstName: ""})
                }

                break;
        
            case "last name":

                if(touched.lastName && value !== ""){
                    if (!value.match(nameRegex)) {
                        setInvalidLastName(true);
                        setValidationErrorMessage({lastName: "Please only include letters in last name."})
                        if(value.length > 26 || value.length < 2){
                            setValidationErrorMessage({...validationErrorMessage , lastName: "Please only include letters in last name field, and keep length at or between 2-26 characters."})
                        }
                    }                     
                } else {
                    setInvalidLastName(false);
                    setValidationErrorMessage({...validationErrorMessage ,lastName: ""})
                }
            
                break;
    
            case "username":

                user = await usernameInUse()
                console.log(value);
                
                if(touched.username && value !== ""){
                    if (value.length < 2 ) {
                        setInvalidUsername(true)
                        setValidationErrorMessage({username: "Please choose a username with at least 2 characters. (Letters or numbers)"})
                    } else if ( !value.match(usernameRegex)){
                        setInvalidUsername(true)
                        setValidationErrorMessage({username: "Please choose a username with valid characters only. (Letters or numbers)"})
                    } else if (user === null) {
                        setInvalidUsername(true)
                        setValidationErrorMessage({username: "Profile with this username already exist. Try signing in."})
                    }                    
                } else {
                    setInvalidUsername(false)
                    setValidationErrorMessage({...validationErrorMessage ,username: ""})
                }
            
                break;
    
            case "email":
                userEmail = await emailInUse()
                
                if(touched.email && value !== "") {
                    if (!validator.isEmail(value)) {
                        setInvalidEmail(true);
                        setValidationErrorMessage({...validationErrorMessage, email: "Please use a valid email."})
                    } else if (userEmail) {
                        setInvalidEmail(true)
                        setValidationErrorMessage({email: "Profile with this email already exist. Try signing in."})
                    }                     
                } else {
                    setInvalidEmail(false);
                    setValidationErrorMessage({...validationErrorMessage, email: ""})
                }
                break;
    
            
    
                case "email confirm":
                    
                    if(touched.confirmEmail && value !== ""){
                        handleMatchEmail();                        
                    }

                    break;

                case "password":

                    if(touched.password && value !== ""){
                        if (!value.match(passwordRegex)) {
                            setInvalidPassword(true);
                            setValidationErrorMessage({...validationErrorMessage, password: "Password should be at least 8 characters in length, and include one of each: lowercase letter, uppercase letter, number, and special symbol"})
                        }                         
                    } else {
                    setInvalidPassword(false);
                    setValidationErrorMessage({...validationErrorMessage, password: ""})
                }
            
                break;
    
            
    
                case "confirm password":

                    if(touched.confirmPassword && value !== ""){
                        handleMatchPassword()                        
                    }

                    break;
            
                default:
                    break;
        }
    };


    const handleMatchEmail = () => {
        if( email !== confirmEmail){
            setMatchEmailError(true);
        } else {
            setMatchEmailError(false);
        };
    };

    const handleMatchPassword = () => {
        if( password !== confirmPassword ) {
            setMatchPasswordError(true);
        } else {
            setMatchPasswordError(false);
        };
    };

    const handleSubmitSignup = async(e) => {
        e.preventDefault()
        const signupForm = {
            firstName,
            lastName,
            username, 
            email,
            confirmEmail,
            password, 
            confirmPassword
        };

        const res = await axios.post("/api/auth/signup/register", {signupForm})


    }

    useEffect(() => {
        const checkSession = async () => {
        const session = await getSession();
        if (session) {
            const u = session.user
            console.log(u);

            router.push('/'); 
        }
        };

        checkSession();
    }, [router]);

    return (
        <div className='h-screen'>

            <Box sx={{bgcolor: grey[200]}} className=' flex flex-col justify-center items-center  min-h-screen gap-6'>

                <div>
                    <Typography className='font-bold ' sx={{color: green[500]}} variant='h1' >
                        Signup 
                    </Typography>
                </div>

                <Box sx={{bgcolor: grey[400], borderRadius: '10px'}} className="md:w-2/5 flex flex-col gap-6" >
                    
                    <Box sx={{bgcolor: grey[600], borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}} className='text-center flex flex-col gap-1 py-3 px-6'>
                        <Typography variant='h3' sx={{color:green[400]}} className='font-bold'>
                            Pearl Box
                        </Typography>
                        <Typography variant='body1' sx={{color:green[400]}} className=''>
                            Cultivating a lifestyle worth living.
                        </Typography>
                    </Box>

                    <div className=' pb-3 px-6'>
                        <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                            
                            {
                                signup &&
                                <div>
                                    <CssTextField fullWidth  value={firstName} className='' onChange={(e)=>{ setFirstName(e.target.value);
                                        setTouched({firstName:true}); }} variant='outlined' label="First Name" 
                                    error={invalidFirstName}
                                    helperText={invalidFirstName ? validationErrorMessage.firstName : ''}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                            borderColor: red[500], // Change border color when there is an error
                                        },
                                        },
                                    }}
                                    />
                                </div>                            
                            }                        
                            {
                                signup &&
                                <div>
                                    <CssTextField fullWidth  value={lastName} className='' onChange={(e)=>{ setLastName(e.target.value);
                                        setTouched({lastName:true});}} variant='outlined' label="Last Name" 
                                    error={invalidLastName}
                                    helperText={invalidLastName ? validationErrorMessage.lastName : ''}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                            borderColor: red[500], // Change border color when there is an error
                                        },
                                        },
                                    }}
                                    /> 
                                </div>                            
                            }                        
                            {
                                signup &&
                                <>
                                    <div>
                                        <Typography variant='body1' sx={{fontSize: '.75rem'}} className='mt-4'>
                                            Username should include letters and numbers only
                                        </Typography>
                                    </div>
                                    <div className='mb-3'>
                                        <CssTextField fullWidth value={username} className='' onChange={(e)=>{ const value = e.target.value; console.log(value);
                                        setUsername(value);
                                        setTouched({username:true});}} variant='outlined' label="Username"
                                        error={invalidUsername}
                                        helperText={invalidUsername ? validationErrorMessage.username : ''}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                                borderColor: red[500], // Change border color when there is an error
                                            },
                                            },
                                        }}
                                        /> 
                                    </div>                              
                                </>
                            }

                            {
                                signup ?
                                    <div>
                                        {validationErrorMessage.email}
                                        <CssTextField fullWidth type='email' value={email} className='' onChange={(e)=>{ const value = e.target.value; setEmail(value);
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
                                    :
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
                            }


                            {
                                signup &&
                                <div>
                                    <CssTextField
                                    fullWidth
                                    type='email'
                                    value={confirmEmail}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setConfirmEmail(value);
                                        setTouched({confirmEmail:true});
                                    }}
                                    variant='outlined'
                                    label="Confirm email"
                                    error={matchEmailError}
                                    helperText={matchEmailError ? 'Emails do not match' : ''}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                            borderColor: red[500], // Change border color when there is an error
                                        },
                                        },
                                    }}
                                    />
                                </div>                            
                            }

                            {
                                signup &&

                                <div>
                                    <Typography variant='body1' sx={{fontSize: '.75rem'}} className='mt-4'>
                                        Password should be at least 8 characters in length, and include one of each: lowercase letter, uppercase letter, number, and special symbol
                                    </Typography>
                                </div>
                            }

                            {
                                signup ?
                                <div>
                                    <CssTextField fullWidth type='password' value={password} className='' onChange={(e)=>{ setPassword(e.target.value);
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
                                :
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
                            }


                            
                            {
                                signup && 
                                <div>
                                    <CssTextField
                                    fullWidth
                                    type='password'
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setTouched({confirmPassword:true});
                                    }}
                                    variant='outlined'
                                    label="Confirm password"
                                    error={matchPasswordError}
                                    helperText={matchPasswordError ? 'Passwords do not match' : ''}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                            borderColor: red[500], // Change border color when there is an error
                                        },
                                        },
                                    }}
                                    />
                                </div>                            
                            }

                            {
                                !signup ?
                                <div className='text-center'>
                                    <Button sx={{}} onClick={()=>setSignup(!signup)}>
                                        Don&apos;t have an account?
                                    </Button>
                                </div>
                                :
                                <div className='text-center'>
                                    <Button sx={{}} onClick={()=>setSignup(!signup)}>
                                        Already have an account? Login!
                                    </Button>
                                </div>
                            }

                            {
                                matchPasswordError || matchEmailError || invalidEmail || invalidFirstName || invalidLastName || invalidPassword || invalidUsername ?
                                <div className='flex justify-center items-center'>
                                    <Button onClick={handleSubmitSignup} disabled type='submit' variant='contained' sx={{bgcolor: green[500]}} className=''>
                                        {button}
                                    </Button>
                                </div>  
                                :
                                signup ?
                                <div className='flex justify-center items-center'>
                                    <Button onClick={handleSubmitSignup} type='submit' variant='contained' sx={{bgcolor: green[500]}} className=''>
                                        {button}
                                    </Button>
                                </div>
                                :
                                !signup ? 
                                <div className='flex justify-center items-center'>
                                    <Button onClick={()=>handleSubmit} type='submit' variant='contained' sx={{bgcolor: green[500]}} className=''>
                                        {button}
                                    </Button>
                                </div>
                                :
                                null
                            }




                        </form>
                    </div>

                </Box>

            </Box>

        </div>
    )
}

export default LoginPage