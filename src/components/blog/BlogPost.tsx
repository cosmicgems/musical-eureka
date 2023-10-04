import { Avatar, Box, Button, CardActions, CardContent, CardMedia, Chip, Collapse, Grid, Stack, Typography } from '@mui/material';
import { blue, green, grey, red } from '@mui/material/colors';
import React, { useRef, useEffect, useState } from 'react'
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



const BlogPost: React.FC<BlogPostProps> = ( {blog} ) => {

    const {_id: id, title, categories, sub_categories, photo, body, slug, createdAt, postedBy, excerpt} = blog;
    const [expanded, setExpanded] = useState<boolean>(false);
    
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
    const router = useRouter()

    const handleClick = (e, href) => {
        e.preventDefault();

        router.push(href)
    }

    const excerpt_two = body.substring(11, 150);

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
                <IconButton aria-label="add to favorites">
                <FavoriteIcon sx={{color: red[500]}} />
                </IconButton>
                <IconButton aria-label="share">
                <ShareIcon sx={{color: blue[500]}} />
                </IconButton>
                <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <ExpandMoreIcon sx={{color: grey[50]}}  />
                </ExpandMore>                
            </CardActions>


            <Collapse sx={{borderBottomRightRadius: "5px", borderBottomLeftRadius: "5px"}} in={expanded} timeout="auto" unmountOnExit>
           
           <CardContent sx={{bgcolor: grey[900],borderBottomRightRadius: "5px", borderBottomLeftRadius: "5px"}} className='p-3 flex justify-evenly items-center'>
                <IconButton
                aria-label="add to favorites">
                    <FacebookShareButton
                    url={`https://pearlbox.co/articles/post/${slug}`}
                    quote={'Dummy text!'}
                    hashtag="#muo"
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                </IconButton>
                
                <IconButton aria-label="add to favorites">
                    <TwitterShareButton
                    url={`https://pearlbox.co/articles/post/${slug}`}
                    // quote={'Dummy text!'}
                    // hashtag="#muo"
                    >
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>
                </IconButton>
                <IconButton aria-label="add to favorites">
                    <WhatsappShareButton
                    url={`https://pearlbox.co/articles/post/${slug}`}
                    // quote={`Dummy Text`}
                    // hashtag="#muo"
                    >
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                </IconButton>    
           </CardContent>

            </Collapse>
        </Box>
    )
}

export default BlogPost