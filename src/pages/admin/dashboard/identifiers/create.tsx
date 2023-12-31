import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors';
import { Layout } from '@components/big-three-components';
import CreateCategory from '../../../../components/Blog Crud/CreateCategory';
import CreateSubcategory from '../../../../components/Blog Crud/CreateSubcategory';
import CreateTag from '../../../../components/Blog Crud/CreateTag';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Loading from '../../../../components/Loading';


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


const CreatePage = () => {
    const router = useRouter();
    const [verified, setVerified] = useState<boolean>(null);
    const {data:session, status} = useSession() as Session;

    const sessionCheck = async() => {
        if(session.user._id ) {
            setVerified(true);
            return true
        } else if (!session.user._id){
            setVerified(false)
            return false
        }
    }

    if(status === "loading") {
        return <Loading />
    }
    
    if(verified === null) {
        const authenticated = sessionCheck();
        if(!authenticated){
            router.push("/admin/unauthorized")
        }
    }

    if(verified ) {
    return (
        <>
            <Box className='min-h-screen ' sx={{bgcolor: grey[100]}}>

                <Layout>

                    <div className='flex flex-col mt-20 py-3 px-6 w-full gap-6'>

                        <Typography variant='h2' className='gradient-text-subcategories w-full text-center' sx={{}}>
                            Create New Identifiers
                        </Typography>

                        <div className='flex flex-col md:flex-row gap-24 w-full'>
                            <div className='md:w-1/2'>
                                <CreateCategory />
                            </div>

                            <div className='md:w-1/3'>
                                <CreateSubcategory />
                            </div>

                            <div className='md:w-1/5'>
                                <CreateTag />
                            </div>                        
                        </div> 


                    </div>
                </Layout>



            </Box>        
        </>



    )}


}

export default CreatePage

CreatePage.superAuth = true;