import React, {useEffect, useState} from 'react';
import { Avatar, Box, Button, Card, CardContent, CardMedia, Chip, Grid, Stack, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import moment from 'moment/moment';;
import { lightBlue } from '@mui/material/colors';
import Layout from '../../../components/Layout'
import Head from 'next/head';
import { getOgImageUrl } from '../../../../helpers/ogImageHelper';
import { useStateContext } from '../../../../Context/StateContext';
import axios from 'axios';
import parse from "html-react-parser"



interface Blog {
  _id: string;
  title: string;
  categories: any[];
  sub_categories: any[];
  photo: string;
  body: string;
  slug: string;
  mtitle: string;
  mdesc: string;
  createdAt: Date;
  updatedAt: Date;
}

const DynamicArticlePage = (props) => {
  
  const {post:{title, body, _id, categories, sub_categories, mtitle, mdesc, createdAt, updatedAt, slug, photo}, related_posts} = props;
  console.log("STAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArt",related_posts, "End");
  
    
    // console.log(post.title);
    const {pathSegment} = useStateContext();

    return (
        <>
            <Head>
              <title>Pearl Box</title>
              <meta property="og:url" content={`https://pearlbox.co/${pathSegment}/articles/${slug}`} />
              <meta property="og:type" content="article" />
              {/* <meta property="og:image" content={ogImageUrl} />
              <meta property='og:title' content="Pearl Box" /> */}
            </Head>
        <Layout  >
            <div className='flex flex-col gap-3 pt-12'>
              <div className='w-full mt-6'>
                <Typography variant='h2' className='gradient-text w-full text-center' sx={{}}>
                   Pearl Box {categories[0].name}
                </Typography>
              </div>

              <div className='flex '>

                <div className='sm:w-4/5 sm:pl-3 flex flex-col gap-6'>
                  <CardMedia 
                  component='img'
                  image={photo}
                  alt=''
                  sx={{objectFit: 'cover'}}
                  className='h-[25vh] '
                  />

                  <div className=''>
                    <Typography sx={{ fontSize: { xs: '2rem', sm:'3.5rem' }, fontWeight: 'bold', color: lightBlue[100], width: '100%', textAlign: 'center' }} variant="h1" component="div">
                        {title}
                    </Typography>
                  </div>

                  <div className=''>
                    <Grid container className='justify-center items-center gap-6' >
                      {sub_categories.map((sc, i)=>{
                        return (
                          <Grid item key={sc._id}  >
                              <Button href={`/articles/categories/category/${categories[0].name}/subcategories/subcategory/${sc.slug}`}>
                                  <Chip
                                  avatar={<Avatar alt={`Photo of ${sc.name}, ${sc.desrciption}`} src={sc.photo_portrait} />}
                                  label={sc.name}
                                  variant="outlined"
                                  />  
                              </Button>
                          </Grid>
                        )
                      })}                  
                    </Grid>

                  </div>

                  <div>
                    {parse(body)}
                  </div>
                </div>

                <div className='sm:w-1/5'>
                  
                  <div>
                    <Typography variant='h3' className='gradient-text' sx={{}}>
                      Ad Space
                    </Typography>
                  </div>
                </div>

              </div>
{/* 
              <div  className='flex gap-6 overflow-x-auto  pb-6 w-[100%] '>
                            
                            {blogs.map((b, i)=> {
                                if(i === 0) {
                                    return (
                                        <Box key={`${i}: ${b._id}`} className='pl-3  flex flex-col gap-3 pb-6 pr-6 ' sx = {{background: 'linear-gradient(to right, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, 0) 100%)'}}>
                                        <div className='flex justify-center items-center'>
                                            <Button href={`/categories/category/${b.categories[0].slug}`}>
                                                <Typography variant='h2' className='font-bold' sx={{fontSize: '1.75rem'}}>
                                                    {b.categories[0].name}
                                                </Typography>                                            
                                            </Button>

                                        </div>
                                        <SmallBlogCard blog={b} />
                                    </Box>
                                    )
                                } else if (i === blogs.length -1){
                                    return (
                                        <Box key={`${i}: ${b._id}`} className='pl-6 pr-6 flex flex-col gap-3' sx = {{background: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)'}}>
                                        <div  ref={targetRef} className='flex justify-center items-center'>
                                            <Button href={`/categories/category/${b.categories[0].slug}`}>
                                                <Typography variant='h2' className='font-bold' sx={{fontSize: '1.75rem'}}>
                                                    {b.categories[0].name}
                                                </Typography>                                            
                                            </Button>

                                        </div>
                                        <SmallBlogCard blog={b} />
                                        <div className=''  >
                                            {loading && <div>Loading more blogs...</div>}
                                        </div> 
                                    </Box>
                                    )
                                } else {
                                    return (
                                        <Box key={`${i}: ${b._id}`} className='pl-3  flex flex-col gap-3'>
                                            <div className='flex justify-center items-center'>
                                                <Button href={`/categories/category/${b.categories[0].slug}`}>
                                                    <Typography variant='h2' className='font-bold' sx={{fontSize: '1.75rem'}}>
                                                        {b.categories[0].name}
                                                    </Typography>                                            
                                                </Button>

                                            </div>
                                            <SmallBlogCard blog={b} />
                                        </Box>
                                    )                                
                                }

                            })}
                        </div> 
 */}



            </div>
        
        </Layout>
        </>




    );
};

export const getStaticPaths = async () => {
    const articles = await axios.get("http://localhost:3000/api/blog/post/get-all-slugs");
    const post = articles.data.post
    const slugs = post.map((a)=> a.slug);
    const paths = slugs.map((slug) => ({
        params: { slug },
    }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const article = await axios.get(`http://localhost:3000/api/blog/post/${slug}`)
  const post = article.data.post;

  const sub_categories = post.sub_categories.map((sc)=> ({ slug: sc.slug}));
  console.log(sub_categories);

  const related_articles = await axios.post('http://localhost:3000/api/blog/post/get-related', {sub_categories} )
  const related_posts = related_articles.data.related_blogs; 

  
  

  return {
    props: {post, related_posts}
  };
};

export default DynamicArticlePage;
