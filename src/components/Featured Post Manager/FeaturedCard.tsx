import { Box, CardMedia, Stack, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import axios from 'axios';



const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
        width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
            }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
        },
}));



const FeaturedCard = ({blog, onFeatureToggle} ) => {

const handleFeatureToggle = async (id:any) => {
    try {
        const res = await axios.put('/api/blog/post/update/featured', {id})
        console.log(res.data);
        onFeatureToggle();
        
    } catch (error) {
        console.error(error)
    }
}
    console.log(blog);
    
  return (
    <Box sx={{bgcolor: blog.i % 2 === 0 ? grey[600] : grey[800], borderRadius: "5px" }} className="flex flex-col">

        <div className="flex justify-between">
            <CardMedia 
            component="img"
            image={blog.b.photo}
            alt={blog.b.excerpt}
            sx={{borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px"}}
            className='w-1/5'
            />

            <div className='p-3 flex flex-col grow'>

                <Typography variant="h3" sx={{fontSize: "1.25rem"}} className="gradient-text-category">
                    {blog.b.title}
                </Typography>
                <Typography variant="h3" sx={{fontSize: "2rem"}} className="">
                    {blog.b.excerpt}
                </Typography>

            </div>

            <div>

                <Stack direction="row" spacing={1} alignItems="center" className='justify-center items-center h-full p-3'>
                    <Typography className='gradient-text-three'>Off</Typography>
                    {
                        blog.b.featured ? 
                        <AntSwitch checked onChange={() => handleFeatureToggle(blog.b._id)}   inputProps={{ 'aria-label': 'ant design' }} />  
                        :
                        <AntSwitch onChange={() => handleFeatureToggle(blog.b._id)}   inputProps={{ 'aria-label': 'ant design' }} />                        
                    }

                    <Typography className={`gradient-text-four`}>On</Typography>
                </Stack>

            </div>
        </div>


    </Box>
  )
}

export default FeaturedCard