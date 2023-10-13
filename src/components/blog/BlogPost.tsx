import { Avatar, Box, Button, CardActions, CardContent, CardMedia, Chip, Collapse, Grid, Stack, Typography } from '@mui/material';
import { blue, green, grey, red } from '@mui/material/colors';
import React, { useRef, useEffect, useState, useCallback } from 'react'
import ReactMarkdown from 'react-markdown';
import parse from "html-react-parser"
import moment from 'moment';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
        EmailShareButton,
        FacebookShareButton, FacebookIcon,
        HatenaShareButton,
        InstapaperShareButton,
        LineShareButton,
        LinkedinShareButton,
        LinkedinIcon,
        LivejournalShareButton,
        MailruShareButton,
        OKShareButton,
        PinterestShareButton,
        PinterestIcon,
        PocketShareButton,
        RedditShareButton,
        TelegramShareButton,
        TelegramIcon,
        TumblrShareButton,
        TwitterShareButton,
        TwitterIcon,
        ViberShareButton,
        VKShareButton,
        WhatsappShareButton,
        WhatsappIcon,
        WorkplaceShareButton
    } from "react-share";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { FacebookButton, FacebookCount } from "react-social";
import axios from 'axios';
import { getOgImageUrl } from '../../../helpers/ogImageHelper';
import { getSession, useSession } from 'next-auth/react';
import User from '../../../lib/models/user';
import connectDB from '../../../lib/connectDB';
import mongoose from 'mongoose';
import SocialShare from '../SocialShare';

    

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
    user: any;
}

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

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));



const BlogPost: React.FC<BlogPostProps> = ( {blog, user} ) => {
    const {data:session, status} = useSession() as Session;
    // console.log(user?.favorite_posts)

    const {_id: id, title, categories, sub_categories, photo, body, slug, createdAt, postedBy, excerpt} = blog;
    const excerpt_two = body.substring(11, 150);
    const pagePath = `https://pearlbox.co/articles/post/${slug}`;
    const data = {
        title,
        url: pagePath,
        text: excerpt ? excerpt : excerpt_two
    }
    const url = `https://pearlbox.co/articles/post/${slug}`

    const [expanded, setExpanded] = useState<boolean>(false);
    const [liked, setLiked] = useState<boolean>(null);
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const router = useRouter()

    const handleNavigate = async(e:any) => {
        e.preventDefault();
        const pageVisit = await axios.put(`/api/blog/post/update/page-visits?id=${id}`);
        router.push(`/articles/post/${slug}`)
        console.log(pageVisit.data.blog);
    };


    const fetchUser = useCallback(async () => {
        try {
          console.log(user?.favorite_posts);
    
          const userLiked = user?.favorite_posts?.some((post) => id.includes(post._id));
          console.log(userLiked);
    
          if (userLiked) {
            setLiked(true);
          } else {
            setLiked(false);
          }
          console.log(liked);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }, [user, id, liked]);

    const handleFavorite = async(e:any) => {
        e.preventDefault();
        const fav = await axios.put(`/api/user-actions/favorite-a-post?user_id=${user._id}&post_id=${id}`);
        console.log(fav.data.liked_posts);
        await fetchUser();
    }


    useEffect(() => {
        
        if(liked === null) {
            if(user !== null )
            fetchUser();
        }        
        console.log(liked, user);
        
    }, [liked, fetchUser, user])
    


    return (
        <Box className="w-[355px] md:w-[400px]" sx={{borderRadius: '5px', bgcolor: grey[900]}}>
            <CardMedia 
            component="img"
            image={photo  ? photo : "https://images.pexels.com/photos/3246665/pexels-photo-3246665.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }
            alt=''
            sx={{objectFit: "cover", borderTopRightRadius: "5px", borderTopLeftRadius: "5px"}}
            className='sm:h-[20vh] h-[25vh]'
            />

            <div className='flex flex-col px-3 w-[100%] gap-3 py-3'>
                <Button onClick={(e)=> {handleNavigate(e)}} >
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
                            
                    <Grid container className='w-full justify-center items-center' spacing={1} >
                    {sub_categories.map((sc,i) => {
                        return (
                            <Grid item key={sc._id} xs={6}  >
                                <Button className='w-full'  href={`/articles/categories/category/${categories[0].slug}/subcategories/subcategory/${sc.slug}`}>
                                    <Chip
                                    avatar={<Avatar alt={`Photo of ${sc.name}, ${sc.desrciption}`} src={sc.photo_portrait} />}
                                    label={sc.name}
                                    sx={{overflow: 'hidden', whiteSpace: 'nowrap', color:grey[50], textOverflow: 'ellipsis', maxWidth: '100%'}}
                                    variant="outlined"
                                    />  
                                </Button>
                            </Grid>

                        )
                    })}
                </Grid>
                </div>

                <Typography variant='body1' sx={{color: grey[50]}} className='truncate-text w-[99%] sm:w-[375px]'   >
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
            <CardActions disableSpacing>
                {
                    user ?
                    <IconButton onClick={(e) => {handleFavorite(e); }} aria-label="add to favorites">
                    <FavoriteIcon sx={{color: liked ? red[500] : grey[50]}} />
                    </IconButton>   
                    : user === null || user === undefined ?
                    null : null
                }


                <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <IconButton aria-label="share">
                <SocialShare data={data} />
                </IconButton>
                </ExpandMore>                
            </CardActions>


            {/* <Collapse sx={{borderBottomRightRadius: "5px", borderBottomLeftRadius: "5px"}} in={expanded} timeout="auto" unmountOnExit>
           
                <CardContent sx={{bgcolor: grey[900],borderBottomRightRadius: "5px", borderBottomLeftRadius: "5px"}} className='p-3 flex justify-evenly items-center'>
                        <IconButton>
                            <FacebookShareButton url={url} >
                                <FacebookIcon size={32} round />
                            </FacebookShareButton>
                        </IconButton>
                        
                        <IconButton aria-label="add to favorites">
                            <TwitterShareButton
                            url={url}
                            >
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>
                        </IconButton>
                        <IconButton aria-label="add to favorites">
                            <WhatsappShareButton
                            url={url}
                            >
                                <WhatsappIcon size={32} round />
                            </WhatsappShareButton>
                        </IconButton>    
                </CardContent>

            </Collapse> */}
        </Box>
    )
}

export default BlogPost