import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Box, Button, Modal, Typography } from '@mui/material';
import { Layout } from '@components/big-three-components';
import { grey } from '@mui/material/colors';
import { signIn, useSession } from 'next-auth/react';
import { PostVerification } from '@components/Auth/modal-content';
import { Session } from 'src/utility/types/Session';

const Verify = () => {
    const {data:session, status} = useSession() as Session;
    const router = useRouter();
    const { token, username, from, path, btnName, } = router.query;
    const [verificationStatus, setVerificationStatus] = useState('');
    const [verified, setVerified] = useState<boolean>(false);
    const [signingIn, setSigningIn] = useState<boolean>(false);
    const [emailUsername, setEmailUsername] = useState<string>("");
    const [password, setPassword] = useState<string>(""); 
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(!open); } 

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

    useEffect(() => {
        
            if (token) {
                const handleToken = async () => { // Make an API request to verify the token
                    const res = await axios.put(`/api/auth/signup/verify?token=${token}&username=${username}`)
                        .then((response) => {
                        setVerificationStatus(response.data.message);
                        setVerified(true);
                        })
                        .catch((error) => {
                        console.error(error);
                        setVerificationStatus('An error occurred during verification');
                        setVerified(false);
                        });
                        
                    console.log(res);
                }       
                handleToken()
            }

        
    }, [token]);


    
    return (
        <Box sx={{bgcolor: grey[200]}}>
            <Layout>
                <div className='min-h-[65vh] flex justify-center items-center px-6 sm:px-24'>
                    <Box sx={{bgcolor: grey[900], borderRadius: '5px'}} className="py-3 px-3 w-full sm:w-[600px] flex flex-col justify-center items-center ">
                        {verified ?
                            <Typography sx={{}} className='gradient-text-four' variant='h3'>
                                Email Verified!
                            </Typography>                        
                            :
                            <Typography sx={{}} className='gradient-text-three' variant='h3'>
                                Email Not Verified!
                            </Typography> 

                        }

                        {
                            verified ?
                                <Typography sx={{}} className='gradient-text-four' variant='body1'>
                                    {verificationStatus}
                                </Typography>
                            :
                                <Typography sx={{}} className='gradient-text-three' variant='body1'>
                                    {verificationStatus}.
                                </Typography>

                        }

                        {
                            verified && from === "store"  &&
                            <Button 
                            variant='outlined' 
                            style={{color: grey[900], borderColor: grey[900]}} 
                            className='gradient-button-signup mt-3' 
                            onClick={() => { setSigningIn(!signingIn); handleOpen() }} 
                            >
                                {btnName}
                            </Button>
                        }
                        <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                            <PostVerification
                            from={from}
                            path={path}                    
                            />
                        </Modal>

                    </Box>
                </div>   
            </Layout>     
        </Box>
    );
}

export default Verify;
