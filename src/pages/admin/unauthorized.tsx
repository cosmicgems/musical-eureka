import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import { Layout } from '@components/big-three-components';
import { useRouter } from 'next/router'

const UnauthorizedPage = () => {

    const router = useRouter();

    setTimeout(() => {
        router.push("/")
    }, 5000)

  return (
    <Box className="" sx={{bgcolor:grey[800]}}>
        <Layout>
            <div className='min-h-[55vh] grow flex flex-col justify-center items-center'>
                <Typography variant='h2' className='gradient-text-three' sx={{}}>
                    Unauthorized Access.
                </Typography>
            </div>
        </Layout>
    </Box>
  )
}

export default UnauthorizedPage