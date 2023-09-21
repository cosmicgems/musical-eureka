import React, { useState, useRef, useEffect, useCallback } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic';
import { useStateContext } from '../../../Context/StateContext';
import { Box, Button, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import BlogPost from '../../components/blog/BlogPost';
import { GetStaticProps } from 'next';
import Subscribe from '../../components/Subscribe';
import SmallBlogCard from '../../components/blog/SmallBlogCard';

const Layout = dynamic(() => import('../../components/Layout'));


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

interface ApiResponse {
    message: string;
    blogs: Blog[];
}


const AllArticlesPage = ({ initialBlogs, totalBlogCount }: { initialBlogs: Blog[]; totalBlogCount: number }) => {
    const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
    const [page, setPage] = useState<number>(1); // Keep track of the page number
    const blogsPerPage = 5;
    const {pageName, pageSlug, pathSegment, showCart, setShowCart, totalQuantities, subcategories } = useStateContext();
    const [homeSearch, setHomeSearch] = useState<string>("");
    const [subscriber, setSubscriber] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const targetRef = useRef();
    let loadedBlogCount = blogs.length; 


    const loadMoreBlogs = useCallback(async () => {
        try {
            const nextPage = page + 1;
            if (loadedBlogCount < totalBlogCount) {
                setLoading(true);
                const res = await axios.get(`http://localhost:3000/api/blog/post/get-all-home?page=${nextPage}&limit=${blogsPerPage}`);
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
    }, [page, totalBlogCount, blogsPerPage]);

    useEffect(() => {
        if(!targetRef?.current) return;
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

        if (targetRef.current) {
            observer.observe(targetRef.current);
                    console.log("It triggered");
        }

        return () => {
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        };
    }, [page, loadMoreBlogs,totalBlogCount, loadedBlogCount]);


    return (
        <Box className='' sx={{bgcolor: grey[100]}}>


            <Layout >
                <div className='min-h-screen sm:min-h-[80vh] flex flex-col justify-between items-center gap-6 pt-12 sm:pt-0 max-w-screen'>
                    <div className='w-full'>
                        <Subscribe/>
                    </div>
                    <div className='flex flex-col justify-center items-center sm:w-3/4  px-6 sm:gap-6'>
                        <div>
                            <Typography variant='h1' className=' gradient-text-home text-center' sx={{color: grey[50], fontSize: {xs:"5rem"}}}>
                                Pearl Box
                            </Typography>
                        </div>
                        <div className='w-full flex gap-0'>
                            <TextField fullWidth variant='outlined' sx={{bgcolor:grey[50], borderTopLeftRadius: '5px', borderBottomLeftRadius: "5px", borderTopRightRadius: "0px", borderBottomRightRadius:"0px"}} label="Search for pearls..." className='' value={homeSearch} onChange={(e)=> {setHomeSearch(e.target.value)}} />
                            <Button variant='contained' sx={{borderTopLeftRadius:0, borderBottomLeftRadius:0,}}>
                                Search
                            </Button>
                        </div>
                    </div>
                        <div  className='flex gap-6 overflow-x-auto  pb-6 w-[100%]'>
                            
                            {blogs.map((b, i)=> {
                                if(i === 0) {
                                    return (
                                        <Box key={`${i}: ${b._id}`} className='pl-3  flex flex-col gap-3 pb-6 pr-6 ' sx = {{background: 'linear-gradient(to right, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, 0) 100%)'}}>
                                        <div className='flex justify-center items-center py-3'>
                                            <Button href={`/categories/category/${b.categories[0].slug}`}>
                                                <Typography variant='h2' className='font-bold gradient-text-category' sx={{fontSize: '1.75rem'}}>
                                                    {b.categories[0].name}
                                                </Typography>                                            
                                            </Button>

                                        </div>
                                        <BlogPost blog={b} />
                                    </Box>
                                    )
                                } else if (i === blogs.length -1){
                                    return (
                                        <Box key={`${i}: ${b._id}`} className='pl-6 pr-6 flex flex-col gap-3' sx = {{background: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)'}}>
                                        <div  ref={targetRef} className='flex justify-center items-center py-3'>
                                            <Button href={`/categories/category/${b.categories[0].slug}`}>
                                                <Typography variant='h2' className='font-bold gradient-text-three' sx={{fontSize: '1.75rem'}}>
                                                    {b.categories[0].name}
                                                </Typography>                                            
                                            </Button>

                                        </div>
                                        <BlogPost blog={b} />
                                        <div className=''  >
                                            {loading && <div>Loading more blogs...</div>}
                                        </div> 
                                    </Box>
                                    )
                                } else {
                                    return (
                                        <Box key={`${i}: ${b._id}`} className='pl-3  flex flex-col gap-3'>
                                            <div className='flex justify-center items-center py-3'>
                                                <Button href={`/categories/category/${b.categories[0].slug}`}>
                                                    <Typography variant='h2' className='font-bold gradient-text-category' sx={{fontSize: '1.75rem', textShadow: "3px 1px "}}>
                                                        {b.categories[0].name}
                                                    </Typography>                                            
                                                </Button>

                                            </div>
                                            <BlogPost blog={b} />
                                        </Box>
                                    )                                
                                }

                            })}
                        </div>                
                </div>

            </Layout>        
        </Box>


    )
}

export async function getStaticProps() {
    try {
        const res = await axios.get(`http://localhost:3000/api/blog/post/get-all-home?page=1&limit=5`);
        const { blogs, totalBlogCount } = res.data.blogs;
        console.log(totalBlogCount);

    return {
        props: { initialBlogs: blogs, totalBlogCount },
    };
    } catch (error) {
        console.log("Error fetching data:", error);
    return {
        props: {
        blogs: [],
        },
    };
    }
}

export default AllArticlesPage