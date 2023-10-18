import { Box } from '@mui/material'
import React from 'react'
import Layout from '../Layout'
import DynamicMobileUserChip from '../User/DynamicMobileUserChip'

const MyProfile = ({user}) => {
  return (
    <Box sx={{}} className="">

        <Layout>

            <div className='h-screen flex flex-col justify-center items-center w-full'>
              My Profile
            </div>

        </Layout>

    </Box>
  )
}

export default MyProfile