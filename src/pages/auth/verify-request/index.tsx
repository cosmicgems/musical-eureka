import React from 'react'
import { Layout } from '@components/big-three-components';
import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useRouter } from 'next/router'

const ConfirmEmailPage = () => {
    const router = useRouter();
    const { first_name, last_name, email, path, from } = router.query;
  return (
    <Box sx={{bgcolor: grey[200]}}>
        <Layout>
            <div className='min-h-[80vh] flex justify-center items-center px-6 sm:px-24'>
                <Box sx={{bgcolor: grey[900], borderRadius: '5px'}} className="py-3 px-3 w-full sm:w-[400] flex flex-col justify-center items-center">
                    <Typography sx={{}} className='gradient-text-five font-bold' variant='h3'>
                        You&apos;re almost there {first_name}!
                    </Typography>
                    <Typography sx={{fontSize: '1.5rem'}} className='gradient-text-five ' variant='body1'>
                        Please check your email at address &quot;{email}&quot;, and follow the link.
                    </Typography>
                </Box>
            </div>   
        </Layout>     
    </Box>


  )
}

export default ConfirmEmailPage