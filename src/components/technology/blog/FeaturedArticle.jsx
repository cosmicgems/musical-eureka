import { Box, Card, CardContent, CardMedia, Grid, Typography, Collapse, IconButton, CardActions } from '@mui/material'
import React from 'react'
import { useStateContext } from '../../../../Context/StateContext'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { blue, grey, lightBlue, green, lightGreen, deepPurple, orange, yellow, } from '@mui/material/colors';
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


const FeaturedArticle = ({article: {title, body, excerpt, createdAt, slug, postedBy, image, metaTitle, metaDescription,}}) => {  
  const { pageSlug, pathSegment } = useStateContext();
  const pageSegmentColors = {
      technology: blue[900], // Example color for "tech" segment
      realty: yellow[600],
      health: lightBlue[200],
      intelligence: orange[500],
      community: deepPurple[400],
      finance: green[500]
    };

  const featuredArticleBackgroundColor = pageSegmentColors[pathSegment] || '#000';
  // console.log(postedBy);
  const [expanded, setExpanded] = React.useState(false);    
  const handleExpandClick = () => {
    setExpanded(!expanded);
    };    
  // console.log(image);




  return (
    <Box className='' sx={{ marginInlineEnd: {sm: '5vw'}, }}>
      <Card sx={{width: {xs: '100%', sm:'65vw', lg:'45vw'},  bgcolor: featuredArticleBackgroundColor , borderRadius: {xs: '0', sm: '10px'}}}>
        <CardContent sx={{ padding: 0}}>
          <CardMedia
                      id='tech'
                      sx={{ height: {xs:'32vh', sm: '20vh', md: '20vh', xl: '20vh'}, objectFit: 'cover', width: '100%' }}
                      image={image}
                      title="pearl-box-tech"
                      
          />
        </CardContent>

        <CardContent sx={{width: '100%'}}>
        <Link href={`/${pathSegment}/articles/${slug.current}`}>
          <Typography component='div' variant='h5' sx={{fontSize: {xs: '1.5em', lg: '2em', }, color: lightBlue['A100'], width: '100%', textAlign: {xs: 'center', md: 'left'}}}>
          {title}
          </Typography>          
        </Link>

          
          <Grid container spacing={0} sx={{width: '100%', color: grey[50]}}>

            <Grid item sx={{}} xs={12}>
              <Stack direction="row" spacing={2} justifyContent='center' alignItems='center' sx={{marginBlock: '1vh  2vh'}}>
              
                  <Avatar alt="Remy Sharp"  src={urlFor(postedBy.image && postedBy.image[0])} 
  sx={{ width: {xs: '20%', sm: '10%', lg: '7vh'}, height:'7vh' }} />
              <Box sx={{ }}>
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
              <Typography variant='p' component='div' sx={{}}>
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
            url=''
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
              <TelegramShareButton
            url=''
            quote={'Dummy text!'}
            hashtag="#muo">
                <TelegramIcon size={32} round />
              </TelegramShareButton>
            </IconButton>
            <IconButton aria-label="add to favorites">
              <WhatsappShareButton
            url=''
            quote={'Dummy text!'}
            hashtag="#muo">
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </IconButton>
            <IconButton aria-label="add to favorites">
              <PinterestShareButton
            url=''
            quote={'Dummy text!'}
            hashtag="#muo">
                <PinterestIcon size={32} round />
              </PinterestShareButton>
            </IconButton>

            </Stack>
            </CardContent>
          </Collapse>

        </CardContent>
      </Card>
    </Box>
  )
}

export default FeaturedArticle