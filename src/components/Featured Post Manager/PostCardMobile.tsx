import { Box, Button, ButtonGroup, CardMedia, Stack, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import axios from 'axios';


interface Author {
    _id: string;
    first_name: string;
    last_name: string;
    photo: string;
    username: string;
    email: string;
}

interface BlogPostProps {
    blogData:{
        blog: {
                _id: string;
                title: string;
                categories: any[];
                sub_categories: any[];
                photo: string;
                body: string;
                slug: string;
                excerpt: string;
                mtitle: string;
                mdesc: string;
                createdAt: Date;
                updatedAt: Date;
                postedBy: Author;
                featured: boolean;
            };
            i: number;
            maxFeatures: boolean;        
    },
    onFeatureToggle: any;
    
}

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





const PostCardMobile: React.FC<BlogPostProps> = ({blogData, onFeatureToggle}) => {

    const {blog, i, maxFeatures} = blogData;
    
    const {_id: id, title, categories, sub_categories, photo, body, slug, createdAt, postedBy, excerpt, featured} = blog;

    
const handleFeatureToggle = async (id:any) => {
    try {
        const res = await axios.put('/api/blog/post/update/featured', {id})
        console.log(res.data);
        onFeatureToggle();
        
    } catch (error) {
        console.error(error)
    }
}
    
    

    return (
        <Box sx={{bgcolor: i % 2 === 0 ? grey[800] : grey[600] , borderRadius: "5px"}} className=" flex gap-3 justify-between ">

            <CardMedia 
            component="img"
            image={photo ? photo : "https://images.pexels.com/photos/397096/pexels-photo-397096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }
            alt={excerpt}
            sx={{borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px"}}
            className='w-1/5'
            />

            <div className='flex flex-col gap-1 grow justify-center p-3'>

                <Typography variant='h3' sx={{fontSize: '1.5rem'}} className="gradient-text-category">
                    {title}
                </Typography>
                <Typography variant="body1" sx={{color:grey[50],}} className='truncate-text w-[99%]'>
                    {excerpt}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center" className='justify-center items-center  p-1'>
                    <Typography className='gradient-text-three'>Off</Typography>
                        {
                            featured ? 
                            <AntSwitch checked onChange={() => handleFeatureToggle(id)}   inputProps={{ 'aria-label': 'ant design' }} />  
                            :
                            <AntSwitch onChange={() => handleFeatureToggle(id)}   inputProps={{ 'aria-label': 'ant design' }} />                        
                        }

                    <Typography className={`gradient-text-four`}>On</Typography>
                </Stack>

            </div>


        </Box>
    )
}

export default PostCardMobile