import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors';
import Layout from '../../../../components/Layout';
import CreateCategory from '../../../../components/Blog Crud/CreateCategory';
import CreateSubcategory from '../../../../components/Blog Crud/CreateSubcategory';
import CreateTag from '../../../../components/Blog Crud/CreateTag';




const CreatePage = () => {

return (
    <>
        <Box className='min-h-screen ' sx={{bgcolor: grey[100]}}>

            <Layout>

                <div className='flex flex-col mt-20 py-3 px-6 w-full gap-6'>

                    <Typography variant='h2' className='gradient-text-subcategories w-full text-center' sx={{}}>
                        Create New Identifiers
                    </Typography>

                    <div className='flex gap-24 w-full'>
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



)
}

export default CreatePage