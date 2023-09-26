import React, { useState, useRef, useEffect, useCallback } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic';
import { useStateContext } from '../../Context/StateContext';
import { Box, Button, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import BlogPost from '../components/blog/BlogPost';
import SmallBlogCard from '../components/blog/SmallBlogCard';
import VideoCard from '../components/VideoCard';
import SearchResults from '../components/Search Bar/SearchResults';
import connectDB from '../../lib/connectDB';
import Blog from '../../lib/models/blog';
import Category from '../../lib/models/category';
import SubCategory from '../../lib/models/sub_category';
import User from '../../lib/models/user';

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
}




const HomePage = ({ initialBlogs, totalBlogCount, videos }: { initialBlogs: Blog[]; totalBlogCount: number, videos: any }) => {
    const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
    const [page, setPage] = useState<number>(1); // Keep track of the page number
    const blogsPerPage = 5;
    const {pageName, pageSlug, pathSegment, showCart, setShowCart, totalQuantities, subcategories } = useStateContext();
    const [search, setSearch] = useState<any>({
        videos: [],
        blogs: [],
    });
    const [subscriber, setSubscriber] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState([]);
    const [debouncedQuery, setDebouncedQuery] = useState('');
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
        // console.log(loadedBlogCount);
        
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
    
    const handleSearch = async () => {
        try {
            const response = await axios.get('/api/youtube', {
                params: {
                query: query,
            },
        });

        setSearch({...search, videos: response.data.videos})

            const blogs = await axios.get('/api/search', {
                params: {
                    query: query
                },
            })
    
            setSearch({...search, blogs: blogs.data.suggestions})
        
        } catch (error) {
            console.error('Error searching videos:', error);
        }
    };

    useEffect(() => {
        // Define a function to perform the actual search when debouncedQuery changes
        const performSearch = async () => {
            if (debouncedQuery.trim() === '') {
                // Clear the search results if the query is empty
                setSearch({...search ,blogs:[]});
                return;
            }
        
           
            try {
                const response = await axios.get('/api/search', {
                    params: {
                        query: debouncedQuery
                    },
                })
                const data = await response.data.suggestions
                console.log(data, "where's this");
                
                setSearch({...search, blogs: data})
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
            };    
            
            const debounceTimeout = setTimeout(() => {
            performSearch();
            }, 500); 
        
        return () => clearTimeout(debounceTimeout); 
    }, [debouncedQuery]);
    
    const handleInputChange = (e) => {
        
        setDebouncedQuery(e.target.value);
        setQuery(e.target.value)

    };

    return (
        <Box className='' sx={{bgcolor: grey[100]}}>


            <Layout >
                <div className='min-h-screen sm:min-h-[80vh] flex flex-col justify-between items-center gap-6 pt-12 sm:pt-0 max-w-[100%]'>
                    <div className='flex flex-col justify-center items-center sm:w-3/4  px-6  mb-6'>
                        <div>
                            <Typography variant='h1' className=' gradient-text-home text-subcategories' sx={{color: grey[50], fontSize: {xs:"5rem"}}}>
                                Pearl Box
                            </Typography>
                        </div>
                        <div className='w-full flex gap-0'>
                            <TextField fullWidth variant='outlined' sx={{bgcolor:grey[50], borderTopLeftRadius: '5px', borderBottomLeftRadius: "5px", borderTopRightRadius: "0px", borderBottomRightRadius:"0px"}} label="Search for pearls..." className='' value={query} onChange={(e) => {handleInputChange(e)}} />
                        </div>
                        <div className='w-full'>
                            <SearchResults results={search} />
                        </div>

                    </div>
                    <div className='flex flex-col sm:flex-row w-[100%] mb-6'>
                    <div className=' sm:w-2/5'>
                        <div className='w-full'>
                        <Typography variant='h3' sx={{}} className='text-center gradient-text-subcategories'>
                            Featured
                        </Typography>
                        </div>
                        <div  className='flex gap-6 overflow-x-auto  pb-6 w-[100%] '>
                            
                            {blogs.map((b, i)=> {
                                if(i === 0) {
                                    return (
                                        <Box key={`${i}: ${b._id}`} className='pl-3  flex flex-col gap-3 pb-6 pr-6 ' sx = {{background: 'linear-gradient(to right, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, 0) 100%)'}}>
                                        <div className='flex justify-center items-center py-3'>
                                            <Button href={`/categories/category/${b.categories[0].slug}`}>
                                                <Typography variant='h2' className='gradient-text-category' sx={{fontSize: '2rem'}}>
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
                                                    <Typography variant='h2' className='font-bold gradient-text-category' sx={{fontSize: '1.75rem'}}>
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
                    
                    <div className='sm:w-3/5'>

                        <div className='w-full'>
                        <Typography variant='h3' sx={{}} className='w-full text-center gradient-text-subcategories'>
                            Media
                        </Typography>
                        </div>

                            {
                                videos?.length > 0 ?
                                    <div   className='flex gap-6 overflow-x-auto  pb-6 w-[100%] '>
                                        {videos.map((v, i) => {
                                            if (videos.length > 0) {
                                                return(
                                                    <div key={i} className='p-3'>
                                                        <VideoCard video={v} />
                                                    </div>
                                                )                                    
                                            } else if (videos.length <= 0) {
                                            return(
                                                <div key="none" className='p-3'>
                                                    <Typography variant='h2' className='gradient-text-four' >
                                                        Google Quota Reached.
                                                    </Typography>
                                                </div>
                                            )
                                            }

                                        })}
                                    </div>
                                :
                                <div className='h-full flex justify-center items-center'>
                                    <Typography variant='h2' className='gradient-text-three text-center'>
                                        Request quota limit has been reached.
                                    </Typography>                                    
                                </div>

                            }

                    </div>

                    </div>

                    <div className='w-[100%]'>

                    <div className='w-full'>
                        <Typography variant='h2' className='text-center gradient-text-subcategories' sx={{}}>
                            Trending
                        </Typography>
                    </div>

                        <div  className='flex gap-6 overflow-x-auto  pb-6 w-[100%] '>
                            
                            {blogs.map((b, i)=> {
                                if(i === 0) {
                                    return (
                                        <Box key={`${i}: ${b._id}`} className='pl-3  flex flex-col gap-3 pb-6 pr-6 ' sx = {{background: 'linear-gradient(to right, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, 0) 100%)'}}>
                                        <div className='flex justify-center items-center'>
                                            <Button href={`/categories/category/${b.categories[0].slug}`}>
                                                <Typography variant='h2' className='font-bold gradient-text-category' sx={{fontSize: '1.75rem'}}>
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
                                                <Typography variant='h2' className='font-bold gradient-text-three' sx={{fontSize: '1.75rem'}}>
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
                                                    <Typography variant='h2' className='font-bold gradient-text-category' sx={{fontSize: '1.75rem'}}>
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
        const blogs = await Blog.find({})
            .populate("categories")
            .populate("sub_categories")
            .populate("postedBy")
            .skip(skip)
            .limit(limitValue);


            console.log(blogs);
            

        // console.log(videos);
        return {
            props: { initialBlogs: JSON.parse(JSON.stringify(blogs)), totalBlogCount, videos },
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