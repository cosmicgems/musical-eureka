import { Box, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import React from 'react'
import { client } from '../../../../sanity/lib/client'
import { blue, lightBlue, red } from '@mui/material/colors';
import RelatedArticle from '../../../components/technology/blog/RelatedArticle';

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
  const query = `*[_type == "article" && slug.current == '${slug}'][0]`;
  const articlesQuery = '*[_type == "article"]';
  
  const article = await client.fetch(query);
  const articles = await client.fetch(articlesQuery);
  const relatedArticlesQuery = `*[_type == "article" && _id != '${article._id}' && references('${article.subcategories[0]._ref}')]`;
  console.log(relatedArticlesQuery);
  const relatedArticles = await client.fetch(relatedArticlesQuery);
  return {
    props: { article, articles, relatedArticles }
  }
}

export default DynamicArticlePage