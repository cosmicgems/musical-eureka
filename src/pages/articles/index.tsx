import React, { useState, useRef, useEffect, useCallback } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic';
import { useStateContext } from '../../../Context/StateContext';
import { Box, Button, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import BlogPost from '../../components/blog/BlogPost';
import { DOMAIN } from "../../../config";
import connectDB from '../../../lib/connectDB';
import Category from '../../../lib/models/category';
import SubCategory from '../../../lib/models/sub_category';
import Blog from '../../../lib/models/blog';
import User from '../../../lib/models/user';
import SearchResults from '../../components/Search Bar/SearchResults';
import { useSession } from 'next-auth/react';
import Loading from '../../components/Loading';
import AllArticles from '../../components/Articles Page/AllArticles';


const Layout = dynamic(() => import('../../components/big-three-components/layout/Layout'));



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


const AllArticlesPage = ({ initialBlogs, totalBlogCount }: { initialBlogs: Blog[]; totalBlogCount: number }) => {
    const {data:session, status} = useSession() as Session;
    const [user, setUser] = useState<any>(null);
    const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
    const [page, setPage] = useState<number>(1); // Keep track of the page number
    const blogsPerPage = 5;
    const [loading, setLoading] = useState<boolean>(false);
    const articlesRef = useRef();
    
    let loadedBlogCount = blogs.length; 
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
    
        // Add an event listener to handle scroll snap on scroll end
        const handleScroll = () => {
        const scrollLeft = scrollContainer.scrollLeft;
        const containerWidth = scrollContainer.clientWidth;
        const articleCards = scrollContainer.querySelectorAll('.scrollable-item');
    
        let nearestCard = null;
        let minDistance = Infinity;
    
        // Find the nearest project card based on scroll position
        articleCards.forEach((card) => {
            const cardRect = card.getBoundingClientRect();
            const distance = Math.abs(cardRect.left - scrollLeft);
    
            if (distance < minDistance) {
            minDistance = distance;
            nearestCard = card;
            }
        });
    
        // Snap to the nearest project card
        if (nearestCard) {
            scrollContainer.scrollTo({
            left: nearestCard.offsetLeft,
            behavior: 'smooth',
            });
        }
        };
    
        if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleScroll);
        }
    
        return () => {
        if (scrollContainer) {
            scrollContainer.removeEventListener('scroll', handleScroll);
        }
        };
    
    }, []);


    const loadMoreBlogs = useCallback(async () => {
        try {
            const nextPage = page + 1;
            if (loadedBlogCount < totalBlogCount) {
                setLoading(true);
                const res = await axios.get(`/api/blog/post/get-all-home?page=${nextPage}&limit=${blogsPerPage}`);
                const newBlogs = res.data.blogs.blogs;
                setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
                setPage(nextPage);
                loadedBlogCount ++
        } else {
            // All blogs are loaded
            console.log('All blogs are loaded.');
        }
        } catch (error) {
            console.error('Error fetching more blogs:', error);
        } finally {
            setLoading(false);
        }
    }, [page, totalBlogCount, blogsPerPage, loadedBlogCount]);

    useEffect(() => {
        if(!articlesRef?.current) return;
        console.log(loadedBlogCount);
        
        if(loadedBlogCount >= totalBlogCount) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    
                    // Load more blogs when the target div becomes visible
                    loadMoreBlogs();
                }
            },
            { threshold: 0.1 } // Adjust the threshold as needed
        );

        if (articlesRef.current) {
            observer.observe(articlesRef.current);
                    console.log("It triggered");
        }

        return () => {
            if (articlesRef.current) {
                observer.unobserve(articlesRef.current);
            }
        };
    }, [page, loadMoreBlogs, totalBlogCount, loadedBlogCount]);


    if(status === "loading"){
        return <Loading/>
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

    return (
        <Box className='' sx={{bgcolor: grey[100]}}>


            <Layout >
                <div className=' min-h-screen sm:min-h-[80vh] flex flex-col justify-between items-center gap-6 pt-20 sm:pt-0 max-w-screen'>
                <div className='flex flex-col justify-center items-center sm:w-3/4  px-6 sm:mt-6  mb-6'>
                        <div>
                            <Typography variant='h2' className=' gradient-text-home text-subcategories text-center' sx={{color: grey[50], }}>
                                Pearl Box
                            </Typography>
                        </div>
                        <div>
                            <Typography variant='body1' className=' gradient-text-subcategories text-subcategories mb-6' sx={{color: grey[50], fontSize: {xs:"1rem"}}}>
                                Curate a lifestyle worth living.
                            </Typography>
                        </div>
                        {/* <SearchResults /> */}

                    </div>
                    <div className='w-[100%]'>
                        <AllArticles blogs={blogs} totalBlogCount={totalBlogCount} user={user} />
                    </div>
                                
                </div>

            </Layout>        
        </Box>


    )
}


  export async function getStaticProps() {
    try {
        await connectDB() 
        let page = 1;
        let limit = 5;
        const pageValue = parseInt(Array.isArray(page) ? page[0] : page, 10) || 1;
        const limitValue = parseInt(Array.isArray(limit) ? limit[0] : limit, 10) || 5;

        const skip = (pageValue - 1) * limitValue;
        await User.find({});
        await Category.find({});
        await SubCategory.find({});
        const totalBlogCount = await Blog.countDocuments();
        const blogs = await Blog.find({})
            .populate("categories")
            .populate("sub_categories")
            .populate("postedBy")
            .skip(skip)
            .limit(limitValue);

        console.log(blogs, totalBlogCount);
        return {
            props: { initialBlogs: JSON.parse(JSON.stringify(blogs)), totalBlogCount, videos: [] },
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

export default AllArticlesPage