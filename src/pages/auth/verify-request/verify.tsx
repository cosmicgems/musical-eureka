import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import Layout from '../../../components/Layout';
import { grey } from '@mui/material/colors';

const Verify = () => {
    const router = useRouter();
    const { token, username } = router.query;
    const [verificationStatus, setVerificationStatus] = useState('');
    const [verified, setVerified] = useState<boolean>(false)

    useEffect(() => {
        if (token) {
        // Make an API request to verify the token
        const res =  axios.put(`/api/auth/signup/verify?token=${token}&username=${username}`)
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
        
    }, [token]);

    // This is a comment
    
    return (
        <Box sx={{bgcolor: grey[200]}}>
            <Layout>
                <div className='h-[80vh] flex justify-center items-center px-6 sm:px-24'>
                    <Box sx={{bgcolor: grey[900], borderRadius: '5px'}} className="py-3 px-3 w-full flex flex-col justify-center items-center">
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


                    </Box>
                </div>   
            </Layout>     
        </Box>
    );
}

export default Verify;
