import { Avatar, Box, Card, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { client } from '../../../../sanity/lib/client'
import { blue, lightBlue, red } from '@mui/material/colors';
import RelatedArticle from '../../../components/technology/blog/RelatedArticle';
import moment from 'moment/moment';

const DynamicArticlePage = ({article, relatedArticles}) => {
  console.log( relatedArticles);
  const {title, body, createdAt, excerpt, image, lastUpdated, metaDescription, metaTitle, postedBy, slug: {current: slug}, _createdAt, _id, _updatedAt} = article;
  return (
  
      <Card elevation={0} sx={{}}>
      <Box sx={{position: 'absolute', marginBlockStart: {xs:'37.5vh', sm: '40vh'}, zIndex: 3, width: '100%'}}>
        <Typography sx={{fontSize: {xs: '2rem' }, fontWeight: 'bold', color: lightBlue[100], width: '100%', textAlign: 'center'}} variant='h6' component='div'>
          {title}
        </Typography>
      </Box>
        <CardContent sx={{height: '45vh', padding: 0, position: 'relative', }}>
          <CardMedia
          title={title && title}
          sx={{objectFit: 'cover', width:'100%', height: '45vh'}}
          id={slug && slug}
          image={image && image} />        
      </CardContent>
      <Box sx={{  width: '100%', paddingInline: {xs: '6vw',sm:'17.5vw'}, paddingBlockStart: '3vh'}}>
      <Grid item sx={{}} xs={12}>
              <Stack direction="row" spacing={2} justifyContent='center' alignItems='center' sx={{marginBlock: '2vh'}}>
              
                  <Avatar alt="Remy Sharp"  src={postedBy.image && postedBy.image[0]} 
                  sx={{ width: {xs:'20%'},  }} />
              <Box sx={{width: '100%'}}>
                <Typography variant='p' component='div' sx={{}}>
                  Posted By: <span className='featuredCard'>{postedBy.username}</span>
                </Typography>
                <Typography variant='p' component='div' sx={{}}>
                  Date: <span className='postDate'>{moment(postedBy.createdAt).fromNow()}</span>
                </Typography>
              </Box>
              </Stack>
            </Grid>
        <Typography variant='paragraph' component='div' sx={{width: '100%'}}>
          {body}
        </Typography>
      </Box>

      <Box sx={{width: '100%', marginBlock: '4vh 1vh'}}>
        <Typography variant='h5' component='div' sx={{width: '100%', textAlign: 'center'}}>
          Related Articles
        </Typography>
      </Box>
      <CardContent sx={{maxWidth: '100%', minWidth:'100%', display:'flex', overflowX: 'scroll',  paddingInline: 0, overflowWrap: 'unset'}}>
      <Stack direction='row' justifyContent="center" alignItems='center' style={{display:'flex', textAlign:'center', paddingInline: 0}}>
                {relatedArticles.map((relatedArticle, i) => {
                  return <CardContent sx={{}} key={i*99+99}><RelatedArticle relatedArticle={relatedArticle}/></CardContent>
                })}
                
                </Stack>
      </CardContent>

      </Card>
    
  )
}


export const getStaticPaths = async () => {
  const query = `*[_type == "article"] {
    slug {
      current
    }
  }
  `;

  const articles = await client.fetch(query);

  const paths = articles.map((article) => ({
    params: { 
      slug: article.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug }}) => {
  const query = `*[_type == "article" && slug.current == '${slug}'][0]{
    _id,
    image,
    title,
    slug,
    desc,
    body,
    postedBy->{  // Fetch the referenced "user" document for the "postedBy" field
      _id,
      username,
      email,
      image
    },
    createdAt,
    lastUpdated,
    postClicks,
    postShares,
    saves,
    excerpt,
    excerptMobile,
    metaTitle,
    metaDescription,
    category->,  // Fetch the referenced "category" document for the "category" field
    subcategories[]->{  // Fetch the referenced "subcategory" documents for the "subcategories" field
      _id,
      name,
      slug,
      photo
    },
    tags[]->{  // Fetch the referenced "tag" documents for the "tags" field
      _id,
      name,
      slug
    },
    alternative_photo{
      image,
      url
    }
  }`;
  const articlesQuery = '*[_type == "article"]';
  
  const article = await client.fetch(query);
  const articles = await client.fetch(articlesQuery);
  const relatedArticlesQuery = `*[_type == "article" && _id != '${article._id}' && references('${article.subcategories[0]._id}')]{
    _id,
    title,
    body,
    excerpt,
    createdAt,
    excerptMobile,
    postedBy->{
      _id,
      username,
      email,
      image
    },
    image,
    metaTitle,
    metaDescription,
    slug
  }`;
  console.log(relatedArticlesQuery);
  const relatedArticles = await client.fetch(relatedArticlesQuery);
  console.log(relatedArticles);
  return {
    props: { article, articles, relatedArticles }
  }
}

export default DynamicArticlePage