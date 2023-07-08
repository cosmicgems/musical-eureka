// import { ExpandMore } from '@mui/icons-material'
import { Avatar, Card, CardActions, CardContent, CardMedia, Collapse, Grid, IconButton,  Stack, Typography } from '@mui/material'
import React from 'react'
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
import { useStateContext } from '../../../../../Context/StateContext';
import { styled } from '@mui/material/styles';
import { blue, green, grey, lightBlue } from '@mui/material/colors';
import Link from 'next/link';
import { urlFor } from '../../../../../lib/client';







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


const MainArticleCard = ({article:{title, body, image, category, subcategories, slug,}}) => {
    const [expanded, setExpanded] = React.useState(false);    
    const handleExpandClick = () => {
    setExpanded(!expanded);
  };
    const {pathSegment} = useStateContext();
  return (
    <div>
        <Card elevation={2} sx={{borderRadius:{xs:'0', lg:'10px'}, marginBlockEnd: '2vh', bgcolor: grey[900]}}>
            <CardMedia 
                    id='tech'
                    sx={{ height: {xs: '24vh', lg: '34vh'},  objectFit: 'cover' }}
                    image={image}
                    title="pearl-box-tech"
            />
            <CardContent sx={{color: lightBlue[50]}}>
            <Link href={`/${pathSegment}/articles/${slug.current}`}>
                <Typography variant='h5' component='div' sx={{fontWeight: 'bold'}}>
                    Lorem, ipsum dolor.
                </Typography>
            </Link>

          
                <Grid container spacing={0} sx={{width: '100%'}}>

                    <Grid item sx={{}} xs={12}>
                    <Stack direction="row" spacing={2}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"  />
                    <Typography variant='p' component='div' sx={{width: '100%'}}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing.
                    </Typography>
                    </Stack>
                    </Grid>

                    <Grid item xs={12} sx={{}}>
                    <Typography variant='p' component='div' sx={{}}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum a illum sequi. Aspernatur dignissimos minus nesciunt tenetur eveniet voluptates fuga!
                    </Typography>
                    </Grid>
                    
                </Grid>            
      <CardActions disableSpacing>
      <Link href=''>
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

export default MainArticleCard