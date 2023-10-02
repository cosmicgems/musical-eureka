import { Avatar, Box, Button, CardMedia, Chip, Grid, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown';
import parse from "html-react-parser"
import moment from 'moment';
import { useRouter } from 'next/router';


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

const BlogPost: React.FC<BlogPostProps> = ( {blog} ) => {

    const {_id: id, title, categories, sub_categories, photo, body, slug, createdAt, postedBy, excerpt} = blog;
    console.log(postedBy);
    
    const router = useRouter()

    const handleClick = (e, href) => {
        e.preventDefault();

        router.push(href)
    }

    const excerpt_two = body.substring(11, 150);

    return (
        <Box className="w-full" sx={{borderRadius: '5px', bgcolor: grey[900]}}>
            <CardMedia 
            component="img"
            image={photo  ? photo : "https://images.pexels.com/photos/3246665/pexels-photo-3246665.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }
            alt=''
            sx={{objectFit: "cover", borderTopRightRadius: "5px", borderTopLeftRadius: "5px"}}
            className='h-[33vh]'
            />

            <div className='flex flex-col px-3 w-[100%] gap-3 py-3'>
                <Button onClick={(e)=> {handleClick(e,`/articles/post/${slug}`)}} >
                    <Typography variant='h3' className='gradient-text-category w-full text-center' sx={{fontSize: "1.5rem"}}>
                        {title}
                    </Typography>                    
                </Button>

                <div>

                    {
                        postedBy ? 
                        <div className='flex flex-col'>

                        <div className='flex justify-center items-center gap-3'>
                            <div className='flex flex-col justify-center items-center'>
                                <Avatar alt={`${postedBy.first_name} ${postedBy.last_name}`} src={postedBy.photo} />
                                <Typography variant='body1' sx={{color: grey[50]}} className=''>
                                    &nbsp;{postedBy.first_name} {postedBy.last_name}
                                </Typography>
                            </div>

                        </div>

                            <div className='flex justify-center items-center gap-3'>
                                < Typography variant="body1" sx={{}} className='gradient-text-category'>
                                    Post Date:  
                                </Typography>
                                
                                    <Typography variant='body1' sx={{color: grey[50]}} className=''>
                                        {moment(createdAt).fromNow()}
                                    </Typography>
                            

                            </div>

                        </div>
                        :

                        null
                    }


                </div>
                
                <div>
                            
                    <Grid container className='w-full' spacing={1} >
                    {sub_categories.map((sc,i) => {
                        return (
                            <Grid item key={sc._id} xs={6}  >
                                <Button  href={`/articles/categories/category/${categories[0].slug}/subcategories/subcategory/${sc.slug}`}>
                                    <Chip
                                    avatar={<Avatar alt={`Photo of ${sc.name}, ${sc.desrciption}`} src={sc.photo_portrait} />}
                                    label={sc.name}
                                    sx={{overflow: 'hidden', whiteSpace: 'nowrap', color:grey[50], textOverflow: 'ellipsis', maxWidth: '80%'}}
                                    variant="outlined"
                                    />  
                                </Button>
                            </Grid>

                        )
                    })}
                </Grid>
                </div>

                <Typography variant='body1' sx={{color: grey[50]}} className='truncate-text w-[350px] sm:w-[375px]'   >
                    {
                        excerpt ?
                        <>
                        {excerpt}
                        </>
                        
                        :
                        <>
                        {excerpt_two} 
                        </>
                    }
                </Typography>        
            </div>
        </Box>
    )
}

export default BlogPost