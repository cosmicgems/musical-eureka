import { Avatar, Box, Button, CardMedia, Typography } from '@mui/material'
import { grey } from '@mui/material/colors';
import moment from 'moment';
import React from 'react'
import { useRouter } from 'next/router';
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
    };
}


const SmallBlogCard: React.FC<BlogPostProps> = ( {blog} ) => {
    const router = useRouter();
    const {_id: id, title, categories, sub_categories, photo, body, slug, createdAt, postedBy} = blog;

    // console.log(photo);
    

    const excerpt = body.substring(11, 150);

    const handleNavigate = async(e:any) => {
        e.preventDefault();
        const pageVisit = await axios.put(`/api/blog/post/update/page-visits?id=${id}`);
        router.push(`/articles/post/${slug}`)
        console.log(pageVisit.data.blog);
        
    }

  return (
    <Box className="w-[350px]  sm:w-[30vw]" sx={{bgcolor:grey[900], borderRadius:"5px",}}>
        <div className='flex flex-row gap-3'>

            <CardMedia 
            component='img'
            image={photo  ? photo : "https://images.pexels.com/photos/3246665/pexels-photo-3246665.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }
            alt=''
            sx={{borderTopLeftRadius:"5px", borderBottomLeftRadius: '5px'}}
            className='w-[100px] sm:w-1/4'
            />

            <div className='flex flex-col gap-3 w-[250px] w-full p-2'>

                <div className='w-[100%]'>
                    
                    <Button fullWidth onClick={(e)=> {handleNavigate(e)}} >
                        <Typography  variant='h3' sx={{fontSize: '1.5rem'}} className='gradient-text '>
                            {title}
                        </Typography>
                    </Button>
                </div>

                <div className='flex flex-row justify-center items-center w-[100%]'>
                    <Avatar  alt={`${postedBy?.first_name} ${postedBy?.last_name}`} src={postedBy?.photo} />
                    <div className='flex flex-col items-center '>
                        <Typography variant='body1' sx={{color: grey[50]}} className=''>
                            &nbsp;{postedBy?.first_name} {postedBy?.last_name}
                        </Typography>
                        <Typography variant='body1' sx={{color:grey[50]}} className=''>
                            {moment(createdAt).fromNow()}
                        </Typography>
                    </div>


                </div>

                <div className=''>
                    <Typography variant='body1' sx={{color:grey[50]}} className='truncate-text w-[95%]'>
                        {excerpt}
                    </Typography>
                </div>

            </div>

        </div>
    </Box>
  )
}

export default SmallBlogCard