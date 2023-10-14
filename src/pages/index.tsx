import React, { useState, useRef, useEffect, useCallback } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic';
import { useStateContext } from '../../Context/StateContext';
import { Box,  Button,  Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import SearchResults from '../components/Search Bar/SearchResults';
import connectDB from '../../lib/connectDB';
import Blog from '../../lib/models/blog';
import Category from '../../lib/models/category';
import SubCategory from '../../lib/models/sub_category';
import User from '../../lib/models/user';
import FeaturedPosts from '../components/Home Page/FeaturedPosts';
import TrendingPosts from '../components/Home Page/TrendingPosts';
import YoutubeVideos from '../components/Home Page/YoutubeVideos';
import { useSession } from 'next-auth/react';
import Loading from '../components/Loading';

const Layout = dynamic(() => import('../components/Layout'));


interface Author {
    _id: string;
    first_name: string;
    last_name: string;
    photo: string;
    username: string;
    email: string;
}

interface Blog {
    _id: string;
    title: string;
    categories: any[];
    sub_categories: any[];
    photo: string;
    body: string;
    excerpt: string;
    slug: string;
    mtitle: string;
    mdesc: string;
    createdAt: Date;
    updatedAt: Date;
    postedBy: Author;
    favorite_post: any[];
}


interface Session {
    data:{
        user:{
            about: string;
            confirmed_account: boolean;
            createdAt: Date;
            email: string;
            first_name: string;
            last_name: string;
            password: string;
            photo: string;
            role: number;
            updatedAt: Date;
            username: string;
            verification_token: string;
            verification_token_expiration: string;
            _id: string;
            
        }      
    },
    status: string;

}



const HomePage = ({ initialBlogs, totalBlogCount, featuredPosts, videos, }: { initialBlogs: Blog[]; totalBlogCount: number, featuredPosts: Blog[], videos: any, }) => {
    
    
    const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
    const [user, setUser] = useState<any>(null);

    const {data: session, status} = useSession() as Session;

    if(status === "loading"){
        return <Loading />
    }

    if(status === "authenticated"){
        if(user === null){
        const findUser = async() => {
            const res = await axios.get(`/api/user-actions/find-user?id=${session.user._id}`);
            setUser(res.data.user);
        }
        findUser();            
        }

    }
    // const handleMigrate = async() => {
    //     const res = await axios.put('/api/migrate')
    //     return res.data.message
    // }


    return (
        <Box className='' sx={{bgcolor: grey[100]}}>


            <Layout >
                <div className='min-h-screen sm:min-h-[80vh] flex flex-col justify-between items-center gap-12 pt-12 sm:pt-0 max-w-[100%]'>
                    <div className='flex flex-col justify-center items-center sm:w-3/4  px-6  mb-6'>
                        <div>
                            <Typography variant='h1' className=' gradient-text-home text-subcategories' sx={{color: grey[50], fontSize: {xs:"5rem"}}}>
                                Pearl Box 
                            </Typography>
                            {/* <Button onClick={handleMigrate}>Migrate</Button> */}
                        </div>
                        <div>
                            <Typography variant='body1' className=' gradient-text-subcategories text-subcategories mb-6' sx={{color: grey[50], fontSize: {xs:"1rem"}}}>
                                Curate a lifestyle worth living.
                            </Typography>
                        </div>
                        <SearchResults />

                    </div>
                    
                    <div className='flex flex-col sm:flex-row w-[100%] mb-6 gap-6'>
                        <div className=' sm:w-2/5'>
                            <FeaturedPosts featuredPosts={featuredPosts} user={user}/>                        
                        </div>
                    
                        <div className='sm:w-3/5'>
                            <YoutubeVideos videos={videos} />
                        </div>

                    </div>

                    <div className='w-[100%]'>

                        <TrendingPosts blogs={blogs} totalBlogCount={totalBlogCount} user={user} />

                    </div>
            
                </div>

            </Layout>        
        </Box>

    )
}


export async function getStaticProps() {
    try {        
        
        const API_KEY = process.env.YOUTUBE_DATA_API_KEY;
        const BASE_URL = 'https://www.googleapis.com/youtube/v3';
        const PLAYLIST_ID = process.env.YOUTUBE_PLAYLIST_ID_QUANTUM
        
        const playlistResponse = await axios.get(`${BASE_URL}/playlistItems`, {
            params: {
                part: 'snippet',
                maxResults: 10, 
                playlistId: PLAYLIST_ID,
                key: API_KEY,
            },
        });

        const videos = playlistResponse.data.items;

        
        await connectDB() 
        let page = 1;
        let limit = 5;
        const pageValue = parseInt(Array.isArray(page) ? page[0] : page, 10) || 1;
        const limitValue = parseInt(Array.isArray(limit) ? limit[0] : limit, 10) || 5;

        const skip = (pageValue - 1) * limitValue;

        await Category.find({});
        await SubCategory.find({});
        await User.find({});
        const totalBlogCount = await Blog.countDocuments();
        const blogs = await Blog.find({featured: false})
                                .populate("categories")
                                .populate("sub_categories")
                                .populate("postedBy")
                                .skip(skip)
                                .limit(limitValue);

        const featuredPosts = await Blog.find({featured: true})
                                        .populate("categories")
                                        .populate("sub_categories")
                                        .populate("postedBy")



            

        // console.log(videos);
        return {
            props: { initialBlogs: JSON.parse(JSON.stringify(blogs)), featuredPosts: JSON.parse(JSON.stringify(featuredPosts)) , totalBlogCount, videos },
            revalidate: 300,
        };       
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                initialBlogs: [], 
                totalBlogCount: null,
                videos: null
            },
        };
    }
}



export default HomePage