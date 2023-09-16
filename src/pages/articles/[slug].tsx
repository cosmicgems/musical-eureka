import React, {useEffect, useState} from 'react';
import { Avatar, Box, Card, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import moment from 'moment/moment';;
import { lightBlue } from '@mui/material/colors';
import Layout from '../../components/Layout'
import Head from 'next/head';
import { getOgImageUrl } from '../../../helpers/ogImageHelper';
import { useStateContext } from '../../../Context/StateContext';
import axios from 'axios';

const DynamicArticlePage = ({title, body, _id, categories, sub_categories, mtitle, mdesc, createdAt, updatedAt, slug}=post) => {
    
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
            <div>

                <div className='mt-24'>
                <Typography sx={{ fontSize: { xs: '2rem' }, fontWeight: 'bold', color: lightBlue[100], width: '100%', textAlign: 'center' }} variant="h1" component="div">
                    {title}
                </Typography>
                </div>

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
  return {
    props: post,
  };
};

export default DynamicArticlePage;
