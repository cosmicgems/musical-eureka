import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Box, Button, TextField, Typography } from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import axios from 'axios';
import { useRouter } from 'next/router';
import validator from 'validator';


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
    width: 800,
    height: "65vh",
    bgcolor: grey[900],
    boxShadow: 24,
    p: 4,
};

const SignupModal = ({handleLogin, loggingIn, setLoggingIn, signingUp, setSigningUp, startAuthorize, setStartAuthorize, handleClose}) => {
    const [emailUsername, setEmailUsername] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [emailLogin, setEmailLogin] = useState<string>("");
    const [confirmEmail, setConfirmEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordLogin, setPasswordLogin] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
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
    const [registered, setRegistered] = useState<boolean>(false);

    const router = useRouter();

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
                console.log(value, "where at?");
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
                console.log(value, "where at?");
                
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
                    }  else {
                                            
                    setInvalidUsername(false)
                    setValidationErrorMessage({...validationErrorMessage ,username: ""})
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
                    } else {
                        setInvalidEmail(false);
                        setValidationErrorMessage({...validationErrorMessage, email: ""})
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
                    } else {
                        setInvalidPassword(false);
                        setValidationErrorMessage({...validationErrorMessage, password: ""})
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
    
    useEffect(() => {
        handleValidation("first name", firstName);
        handleValidation("last name", lastName);
        handleValidation("username", username);
        handleValidation("email", email);
        handleValidation("email confirm", confirmEmail);
        handleValidation("password", password);
        handleValidation("confirm password", confirmPassword);
        if(registered) {
            router.push({pathname:"/auth/verify-request", query: { first_name: firstName, last_name: lastName, email: email, path: `/store/cart`}})
        }
    }, [
        firstName, 
        lastName, 
        username, 
        email, 
        confirmEmail, 
        password, 
        confirmPassword, 
        router, 
        registered, 
    ]);

    
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
        const path = "/store/cart"
        const from = "store"
        const btnName = "Continue Checkout"

        const res = await axios.post("/api/auth/signup/register", {signupForm, path, from, btnName })

        if(res.status === 200) {
            setRegistered(true);
        }


    }


  return (
    <Box sx={style} className="rounded flex flex-col gap-3">
        <div className='flex flex-col gap-3 h-full'>
            
            <div className='flex flex-col '>
                <Typography id="modal-modal-title" variant="h5" className='gradient-text text-center' component="div" sx={{}}>
                    Pearl Box
                </Typography>

                <Typography id="modal-modal-title" variant="h6" className='gradient-text text-center' component="div" sx={{}}>
                    Sign Up
                </Typography>            
            </div>

            
                <div className='flex flex-col gap-3 h-[80%]'>

                    <form className='flex flex-col gap-3 overflow-y-auto px-3 '>
                        <div>
                            <CssTextField fullWidth  value={firstName} className='' onChange={(e)=>{ setFirstName(e.target.value);
                                setTouched({...touched,firstName:true}); }} variant='outlined' label="First Name" 
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
                    
                        <div>
                            <CssTextField fullWidth  value={lastName} className='' onChange={(e)=>{ setLastName(e.target.value);
                                setTouched({...touched,lastName:true});}} variant='outlined' label="Last Name" 
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
                        <>
                            <div>
                                <Typography variant='body1' sx={{fontSize: '.75rem'}} className='mt-4'>
                                    Username should include letters and numbers only
                                </Typography>
                            </div>
                            <div className='mb-3'>
                                <CssTextField fullWidth value={username} className='' onChange={(e)=>{ const value = e.target.value; console.log(value);
                                setUsername(value);
                                setTouched({...touched,username:true});}} variant='outlined' label="Username"
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

                        
                        <div>
                            {validationErrorMessage.email}
                            <CssTextField fullWidth type='email' value={email} className='' onChange={(e)=>{ const value = e.target.value; setEmail(value);
                                    setTouched({...touched,email:true}); }} variant='outlined' label="Email"
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
                            <CssTextField
                            fullWidth
                            type='email'
                            value={confirmEmail}
                            onChange={(e) => {
                                const value = e.target.value;
                                setConfirmEmail(value);
                                setTouched({...touched,confirmEmail:true});
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
                    

                        <div>
                            <Typography variant='body1' sx={{fontSize: '.75rem'}} className='mt-4'>
                                Password should be at least 8 characters in length, and include one of each: lowercase letter, uppercase letter, number, and special symbol
                            </Typography>
                        </div>
                
                        <div>
                            <CssTextField fullWidth type='password' value={password} className='' onChange={(e)=>{ setPassword(e.target.value);
                                    setTouched({...touched,password:true});}} variant='outlined' label="Password" 
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
                    
                        <div>
                            <CssTextField
                            fullWidth
                            type='password'
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setTouched({...touched,confirmPassword:true});
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
                        
                    </form>

                    {
                        matchPasswordError || matchEmailError || invalidEmail || invalidFirstName || invalidLastName || invalidPassword || invalidUsername ?
                        <div className='flex flex-col justify-center items-center'>
                            <Button  size='large' fullWidth className=''>
                                Already have an account? Login!
                            </Button>
                            <Button onClick={handleSubmitSignup} disabled type='submit' variant='contained' sx={{bgcolor: green[500]}} className=''>
                                Sign Up
                            </Button>
                        </div>
                        :
                        <div className='basis-1/6 flex flex-col'>
                            <Button onClick={()=>{}}  size='large'  fullWidth className=''>
                                Already have an account? Login!
                            </Button>
                            
                            <Button onClick={handleSubmitSignup} size='large' variant='outlined' sx={{}} fullWidth className=''>
                                Sign Up
                            </Button>                                        
                        </div>

                    }

                </div>
                
        </div>        
    </Box>

  )
}

export default SignupModal