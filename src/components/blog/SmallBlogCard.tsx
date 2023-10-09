import { Avatar, Box, Button, CardActions, CardContent, CardMedia, Collapse, Typography } from '@mui/material'
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { blue, grey, red } from '@mui/material/colors';
import moment from 'moment';
import React, { useState , useEffect, useCallback } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSession } from 'next-auth/react';
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
import { styled } from '@mui/material/styles';

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
    user:any;
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



const SmallBlogCard: React.FC<BlogPostProps> = ( {blog, user} ) => {
    const router = useRouter();
    const {_id: id, title, categories, sub_categories, photo, body, slug, createdAt, postedBy} = blog;
    const [liked, setLiked] = useState<boolean>(null);
    const [expanded, setExpanded] = useState<boolean>(false);
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const url = `https://pearlbox.co/articles/post/${slug}`
    
    const excerpt = body.substring(11, 150);

    const handleNavigate = async(e:any) => {
        e.preventDefault();
        const pageVisit = await axios.put(`/api/blog/post/update/page-visits?id=${id}`);
        router.push(`/articles/post/${slug}`)
        console.log(pageVisit.data.blog);
        
    }



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
            if(user !== null  )
            fetchUser();
        }        
        console.log(liked, user);
        
    }, [liked, fetchUser, user])
    

  return (
    <Box className="w-[350px]  sm:w-[30vw]" sx={{bgcolor:grey[900], borderRadius:"5px",}}>
        <div className='flex flex-row gap-3'>

            <CardMedia 
            component='img'
            image={photo  ? photo : "https://images.pexels.com/photos/3246665/pexels-photo-3246665.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }
            alt=''
            sx={{borderTopLeftRadius:"5px",}}
            className='w-[100px] sm:w-1/4'
            />

            <div className='flex flex-col gap-3  w-[230px] sm:w-3/5 p-2'>

                <div className='w-content'>
                    
                    <Button className='w-full'  onClick={(e)=> {handleNavigate(e)}} >
                        <Typography  variant='h3' sx={{fontSize: '1.5rem'}} className='gradient-text truncate-text w-[100%]  '>
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
                    <Typography variant='body1' sx={{color:grey[50]}} className='truncate-text  w-[100%]'>
                        {excerpt}
                    </Typography>
                </div>

            </div>

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
                <ShareIcon sx={{color: blue[500]}} />
                </IconButton>
                </ExpandMore>                
            </CardActions>


            <Collapse sx={{borderBottomRightRadius: "5px", borderBottomLeftRadius: "5px"}} in={expanded} timeout="auto" unmountOnExit>
           
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

            </Collapse>
    </Box>
  )
}

export default SmallBlogCard