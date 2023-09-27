import React, {useEffect, useState} from 'react';
import { Avatar, Box, Button, Card, CardContent, CardMedia, Chip, Grid, Stack, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import moment from 'moment/moment';;
import { grey, lightBlue } from '@mui/material/colors';
import Layout from '../../../components/Layout'
import Head from 'next/head';
import { getOgImageUrl } from '../../../../helpers/ogImageHelper';
import { useStateContext } from '../../../../Context/StateContext';
import axios from 'axios';
import parse from "html-react-parser"
import RecentBlogCard from '../../../components/blog/RecentBlogCard';
import { API, DOMAIN, APP_NAME } from "../../../../config";
import connectDB from '../../../../lib/connectDB';
import Blog from '../../../../lib/models/blog';
import Category from '../../../../lib/models/category';
import SubCategory from '../../../../lib/models/sub_category';
import User from '../../../../lib/models/user';



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
  
    
    // console.log(related_posts);
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
            <Box className='' sx={{bgcolor: grey[100]}}>
              <Layout  >
                  <div className='flex flex-col gap-3 pt-12'>
                    <div className='w-full mt-6'>
                      <Typography variant='h2' className='gradient-text w-full text-center' sx={{fontSize: {xs: "1.5rem", sm:"3rem"}}}>
                        Pearl Box {categories[0].name}
                      </Typography>
                    </div>

                    <div className='flex flex-col sm:flex-row '>

                      <div className='sm:w-4/5 sm:pl-3 flex flex-col gap-6'>
                        <CardMedia 
                        component='img'
                        image={photo}
                        alt=''
                        sx={{objectFit: 'cover'}}
                        className='h-[33vh] sm:h-[25vh] '
                        />

                        <div className=''>
                          <Typography sx={{ fontSize: { xs: '2rem', sm:'3.5rem' }, fontWeight: 'bold', width: '100%', textAlign: 'center' }} className='gradient-text' variant="h1" component="div">
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

                    <div className='w-full'>
                      <Typography variant='h3' className='gradient-text-subcategories w-full text-center' sx={{}}>
                        Related Articles
                      </Typography>
                    </div>

                    <div  className='flex gap-6 sm:justify-center sm:items-center  pb-6 w-[100%] overflow-x-auto '>
                                  
                                  {related_posts.map((b, i)=> {
                                      if(i >= 3) {
                                          return
                                      } else if (i === 2){
                                          return (
                                              <Box key={`${i}: ${b._id}`} className='pb-3 pl-6 pr-6 flex flex-col gap-3 sm:w-[25vw]' sx={{background: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)'}}>
                                              <div   className='flex justify-center items-center'>
                                                  <Button href={`/categories/category/${b.categories[0].slug}`}>
                                                      <Typography variant='h2' className='font-bold' sx={{fontSize: '1.75rem'}}>
                                                          {b.categories[0].name}
                                                      </Typography>                                            
                                                  </Button>

                                              </div>
                                              <RecentBlogCard blog={b} />
                                          </Box>
                                          )
                                      } else if(i === 0){
                                          return (
                                              <Box key={`${i}: ${b._id}`} className='pb-3 pl-3  flex flex-col gap-3 pr-6  sm:w-[25vw]' sx={{background: 'linear-gradient(to right, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, 0) 100%)'}} >
                                              <div className='flex justify-center items-center'>
                                                  <Button href={`/categories/category/${b.categories[0].slug}`}>
                                                      <Typography variant='h2' className='font-bold' sx={{fontSize: '1.75rem'}}>
                                                          {b.categories[0].name}
                                                      </Typography>                                            
                                                  </Button>

                                              </div>
                                              <RecentBlogCard blog={b} />
                                          </Box>
                                          )
                                      } else {
                                          return (
                                              <Box key={`${i}: ${b._id}`} className='pb-3 pl-3  flex flex-col gap-3  sm:w-[25vw]'>
                                                  <div className='flex justify-center items-center'>
                                                      <Button href={`/categories/category/${b.categories[0].slug}`}>
                                                          <Typography variant='h2' className='font-bold' sx={{fontSize: '1.75rem'}}>
                                                              {b.categories[0].name}
                                                          </Typography>                                            
                                                      </Button>

                                                  </div>
                                                  <RecentBlogCard blog={b} />
                                              </Box>
                                          )                                
                                      }

                                  })}
                              </div> 




                  </div>
              
              </Layout>              
            </Box>

        </>




    );
};







export const getStaticPaths = async () => {
  
  await connectDB();
  const response = await Blog.find({}, 'slug');
  const slugs = response.map((r) => r.slug )

  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {

  await connectDB();
  await Category.find({});
  await SubCategory.find({});
  await User.find({});
  const post = await Blog.findOne({slug})
                          .populate("categories")
                          .populate("sub_categories")
                          .populate("postedBy");

  


  const sub_categories = post.sub_categories.map((sc) => ({ slug: sc.slug }));
  
  let matches = [];
  sub_categories.map((m) => {
    matches.push(m.slug)
  });

  const related_blogs_before_filter = await Blog.find({})
                                                .populate("categories")
                                                .populate("sub_categories");

  const related_posts =  related_blogs_before_filter.filter((blog) => 
    blog.sub_categories.some((subcategory) => 
      matches.includes(subcategory.slug)
    )
  );

  // console.log(related_posts);
  

  return {
    props: { post: JSON.parse(JSON.stringify(post)), related_posts: JSON.parse(JSON.stringify(related_posts)) },
  };
};


export default DynamicArticlePage;
