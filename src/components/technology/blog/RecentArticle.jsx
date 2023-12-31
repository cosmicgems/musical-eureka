import { Box, Card, CardContent, CardMedia, Grid, Typography, Collapse, IconButton, CardActions  } from '@mui/material'
import React, {useEffect, useState} from 'react'
import { useStateContext } from '../../../../Context/StateContext'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { urlFor } from '../../../../lib/client';
import moment from 'moment/moment';
import Link from 'next/link';
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
import ShareIcon from '@mui/icons-material/Share';
import ReadMoreRoundedIcon from '@mui/icons-material/ReadMoreRounded';
import { styled } from '@mui/material/styles';
import { blue, grey, lightBlue, green, lightGreen, deepPurple, orange, yellow, } from '@mui/material/colors';
import { getClientOgImageUrl } from '../../../../helpers/ogImageHelper';



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const RecentArticle = ({RecentArticle: {title, body, excerpt, createdAt, slug, excerptMobile, postedBy, image, metaTitle, metaDescription}}) => {
  const {pathSegment} = useStateContext();
  const pageSegmentColors = {
      technology: blue[900], // Example color for "tech" segment
      realty: yellow[600],
      health: lightBlue[200],
      intelligence: orange[500],
      community: deepPurple[400],
      finance: green[500]
    };

  const recentArticleBackgroundColor = pageSegmentColors[pathSegment] || '#000';
  
  const [expanded, setExpanded] = React.useState(false);    
  const handleExpandClick = () => {
    setExpanded(!expanded);
    };    
  
    
    const [ogImageUrl, setOgImageUrl] = React.useState(null);   
    const description = excerpt
  
    useEffect(() => {
      const fetchOgImageUrl = async () => {
        try {
          // Call the async function and wait for the result
          const imageUrl = await getClientOgImageUrl(title, description, image);
          
          setOgImageUrl(imageUrl); // Set the resolved URL to the state
        } catch (error) {
          console.error("Error fetching OG image:", error);
        }
      };
  
      fetchOgImageUrl();
    }, [title, description, image]);
  

  
  
  return (
    <div className=''>
      <Card sx={{ height: 'auto', bgcolor: recentArticleBackgroundColor, borderRadius: {xs: '0', sm: '10px'}}}>
        <img
                    id='tech'
                    style={{ height: '20vh', objectFit: 'cover', width: '100%' }}
                    src={image && image}
                    title="pearl-box-tech"
                    
        />
        <CardContent>

          <Link href={`${pathSegment}/articles/${slug.current}`}>
            <Typography component='div' variant='h6' sx={{ color: lightBlue['A100']}}>
            {title}
            </Typography>            
          </Link>

          
          <Grid container spacing={0} sx={{width: '100%', color: grey[50]}}>

            <Grid item sx={{}} xs={12}>
              <Stack direction="row" spacing={2} justifyContent='center' alignItems='center' sx={{marginBlock: '2vh'}}>
              
                  <Avatar alt="Remy Sharp"  src={urlFor(postedBy.image && postedBy.image[0])} 
                  sx={{ width: '20%', height:'100%' }} />
              <Box sx={{width: '100%'}}>
                <Typography variant='p' component='div' sx={{}}>
                  Posted By: <span className='featuredCard'>{postedBy.username}</span>
                </Typography>
                <Typography variant='p' component='div' sx={{}}>
                  Date: <span className='postDate'>{moment(createdAt).fromNow()}</span>
                </Typography>
              </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} sx={{}}>
              <Typography className='multiline-ellipsis' variant='p' component='div' sx={{ overflow: 'hidden',  textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: {xs:'370px', sm: '325px'}, display: {xs: '-webkit-box'}, }}>
              {excerpt}
              </Typography>
            </Grid>
            
          </Grid>
                    
                    <CardActions disableSpacing>
                    <Link href={`/${pathSegment}/articles/${slug.current}`}>
                      <IconButton aria-label="add to favorites">
                        Read More <ReadMoreRoundedIcon fontSize='large' />
                      </IconButton>
                    </Link>
                      
                      <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ShareIcon sx={{color: green['A400']}} />
                      </ExpandMore>
                    </CardActions>
          
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                      <Stack direction='row' justifyContent='center'>
          
                          
                      <IconButton aria-label="add to favorites">
                        <FacebookShareButton
                      url={ogImageUrl}
                      quote={'Dummy text!'}
                      hashtag="#muo">
                        <FacebookIcon size={32} round />
                        </FacebookShareButton>
                      </IconButton>
                      
                      <IconButton aria-label="add to favorites">
                        <TwitterShareButton
                      url=''
                      quote={'Dummy text!'}
                      hashtag="#muo">
                          <TwitterIcon size={32} round />
                        </TwitterShareButton>
                      </IconButton>
                      
                      <IconButton aria-label="add to favorites">
                        <WhatsappShareButton
                      url=''
                      quote={'Dummy text!'}
                      hashtag="#muo">
                          <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                      </IconButton>
                      
          
                      </Stack>
                      </CardContent>
                    </Collapse>


        </CardContent>
      </Card>
    </div>
  )
}

export default RecentArticle