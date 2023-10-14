import { Avatar, Box, Button, CardActions, CardMedia, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment';
import axios from 'axios';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSession } from 'next-auth/react';
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



const RecentBlogCard: React.FC<BlogPostProps> = ( {blog, user} ) => {
    const {data:session, status} = useSession() as Session;
    const router = useRouter();
    const {_id: id, title, categories, sub_categories, photo, body, slug, createdAt, postedBy, excerpt} = blog;
    const [expanded, setExpanded] = useState<boolean>(false);
    const [liked, setLiked] = useState<boolean>(null);


    const pagePath = `https://pearlbox.co/articles/post/${slug}`

    const excerpt_two = body.substring(11, 150);

    const data = {
        title,
        url: pagePath,
        text: excerpt ? excerpt : excerpt_two
    }


    const handleNavigate = async(e:any) => {
        e.preventDefault();
        const pageVisit = await axios.put(`/api/blog/post/update/page-visits?id=${id}`);
        router.push(`/articles/post/${slug}`)
        console.log(pageVisit.data.blog);
        
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
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
    <Box className="sm:w-full w-[325px] " sx={{borderRadius: '5px', bgcolor: grey[900]}}>
        <CardMedia 
        component="img"
        image={photo  ? photo : "https://images.pexels.com/photos/3246665/pexels-photo-3246665.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }
        alt=''
        sx={{objectFit: "cover", borderTopRightRadius: "5px", borderTopLeftRadius: "5px"}}
        className='h-[12vh]'
        />
        
        <div className='flex flex-col gap-3 p-3 text-center'>

            <div>
                <Button onClick={(e)=> {handleNavigate(e)}}>
                    <Typography sx={{fontSize: '1.25rem'}} variant='h3' className='gradient-text-category'>
                        {title}
                    </Typography>                
                </Button>

            </div>


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


            <div>
                <Typography variant='body1' sx={{color: grey[50]}} className='truncate-text  w-[100%]'>
                    {excerpt ? excerpt : excerpt_two}
                </Typography>
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
                        <SocialShare data={data} />
                    </IconButton>
                </ExpandMore>                 
            </CardActions>


    </Box>
  )
}

export default RecentBlogCard