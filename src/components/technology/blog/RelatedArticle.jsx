import { Box, Card, CardContent, CardMedia, Grid, Typography, Collapse, IconButton, CardActions  } from '@mui/material'
import React from 'react'
import { useStateContext } from '../../../../Context/StateContext'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { blue, grey, lightBlue, green, lightGreen } from '@mui/material/colors';
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




const RelatedArticle = ({relatedArticle: {title, body, excerpt, slug:{current:slug}, createdAt,  excerptMobile,postedBy:{image:userImage, username}, image, metaTitle, metaDescription}}) => {
  // console.log(postedBy);
    
  const {pathSegment} = useStateContext();
  const [expanded, setExpanded] = React.useState(false);    
  const handleExpandClick = () => {
    setExpanded(!expanded);
    };    
  

  return (
    <div className=''>
    
      <Card sx={{ height: 'auto', bgcolor: blue[900], width: {xs: '90%', sm: '45%'}}}>
        <CardMedia
                    id='tech'
                    style={{ height: '20vh', objectFit: 'cover', width: '100%' }}
                    image={ image}
                    title="pearl-box-tech"
                    
        />
        <CardContent>

          <Link href={`${pathSegment}/articles/${slug}`}>
            <Typography component='div' variant='h6' sx={{ color: lightBlue['A100']}}>
            {title}
            </Typography>            
          </Link>

          
          <Grid container spacing={0} sx={{width: '100%', color: grey[50]}}>

            <Grid item sx={{}} xs={12}>
              <Stack direction="row" spacing={2} justifyContent='center' alignItems='center' sx={{marginBlock: '2vh'}}>
              
                  <Avatar alt="Remy Sharp"  src={urlFor(userImage && userImage[0])}
                  sx={{width: '7vh', height: '7vh'}}/>
              <Box sx={{width: '100%'}}>
                <Typography variant='p' component='div' sx={{}}>
                  Posted By: <span className='featuredCard'>{username}</span>
                </Typography>
                <Typography variant='p' component='div' sx={{}}>
                  Date: <span className='postDate'>{moment(createdAt).fromNow()}</span>
                </Typography>
              </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} sx={{}}>
              <Typography className='multiline-ellipsis' variant='p' component='div' sx={{ overflow: 'hidden',  textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: {xs:'100%', sm: '100%'}, display: {xs: '-webkit-box'}, }}>
              {excerpt}
              </Typography>
            </Grid>
            
          </Grid>
                    
                    <CardActions disableSpacing>
                    <Link href={`/${pathSegment}/articles/${slug}`}>
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
    </div>
  )
}

export default RelatedArticle