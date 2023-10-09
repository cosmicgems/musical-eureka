import { Box, Button, Typography } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import SmallBlogCard from '../blog/SmallBlogCard'
import axios from 'axios';
import { useSession } from 'next-auth/react';


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
    totalBlogCount: any;
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


const TrendingPosts = ({blogs:initialBlogs, totalBlogCount, user}) => {
    const {data: session, status} =  useSession() as Session;
    const targetRef = useRef();
    const [loading, setLoading] = useState<boolean>(false);
    const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
    const [page, setPage] = useState<number>(1); // Keep track of the page number
    const blogsPerPage = 5;
    const [loadedBlogs, setLoadedBlogs] = useState<Blog[]>([])
    const [loadedBlogCount, setLoadedBlogCount] = useState<number>(blogs.length)
    const scrollTrendContainerRef = useRef(null);

    useEffect(() => {
        const scrollContainer = scrollTrendContainerRef.current;
    
        // Add an event listener to handle scroll snap on scroll end
        const handleScroll = () => {
        const scrollLeft = scrollContainer.scrollLeft;
        const containerWidth = scrollContainer.clientWidth;
        const trendingCards = scrollContainer.querySelectorAll('.scrollable-item');
    
        let nearestCard = null;
        let minDistance = Infinity;
    
        // Find the nearest project card based on scroll position
        trendingCards.forEach((card) => {
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
                // setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
                setLoadedBlogs(newBlogs)
                setPage(nextPage);
                setLoadedBlogCount(loadedBlogCount + newBlogs.length)
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
            { threshold: .1 } // Adjust the threshold as needed
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


    if (status === "loading"){
        return <h3 className='gradient-text' >Loading...</h3>
    } else {
        
        return (
            <div>
                <div className='w-full'>
                    <Typography variant='h2' className='text-center gradient-text-subcategories' sx={{}}>
                        Trending
                    </Typography>
                </div>

                    <div className='flex gap-6 overflow-x-auto  pb-6 w-[100%] scrollable-container '>
                        
                        {blogs.map((b, i)=> {
                            if(i === 0) {
                                return (
                                    <Box key={`${i}: ${b._id}`} className='pl-3  flex flex-col gap-3 pb-6 pr-6 scrollable-item' sx = {{background: 'linear-gradient(to right, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, 0) 100%)'}}>
                                    <div className='flex justify-center items-center'>
                                        <Button href={`/articles/categories/category/${b.categories[0].slug}`}>
                                            <Typography variant='h2' className='font-bold gradient-text-category' sx={{fontSize: '1.75rem'}}>
                                                {b.categories[0].name}
                                            </Typography>                                            
                                        </Button>

                                    </div>
                                    <SmallBlogCard blog={b} user={user} />
                                </Box>
                                )
                            } else if (i === blogs.length -1 ){
                                return (
                                    <Box key={`${i}: ${b._id}`} className='pl-6 pr-6 flex flex-col gap-3 scrollable-item' sx = {{background: loadedBlogs.length === 0 && 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)'}}>

                                    
                                        <div className='flex justify-center items-center'>
                                            <Button href={`/articles/categories/category/${b.categories[0].slug}`}>
                                                <Typography variant='h2' className={loadedBlogs.length === 0 ? `font-bold gradient-text-three` :  `font-bold gradient-text-category`} sx={{fontSize: '1.75rem'}}>
                                                    {b.categories[0].name}
                                                </Typography>                                            
                                            </Button>

                                        </div>      

                                    <SmallBlogCard blog={b}user={user}/>
                                </Box>
                                )
                            } else {
                                return (
                                    <Box key={`${i}: ${b._id}`} className='pl-3  flex flex-col gap-3 scrollable-item'>
                                        <div className='flex justify-center items-center'>
                                            <Button href={`/articles/categories/category/${b.categories[0].slug}`}>
                                                <Typography variant='h2' className='font-bold gradient-text-category' sx={{fontSize: '1.75rem'}}>
                                                    {b.categories[0].name}
                                                </Typography>                                            
                                            </Button>

                                        </div>
                                        <SmallBlogCard blog={b} user={user} />
                                    </Box>
                                )                                
                            }

                        })}
                        {
                            loadedBlogs.length > 0 &&
                            loadedBlogs.map((b, i)=> {
                                if(i === 0) {
                                    return (
                                        <Box key={`${i}: ${b._id}`} className='pl-3  flex flex-col gap-3 pb-6 pr-6 scrollable-item' sx = {{}}>
                                        <div className='flex justify-center items-center'>
                                            <Button href={`/articles/categories/category/${b.categories[0].slug}`}>
                                                <Typography variant='h2' className='font-bold gradient-text-category' sx={{fontSize: '1.75rem'}}>
                                                    {b.categories[0].name}
                                                </Typography>                                            
                                            </Button>
    
                                        </div>
                                        <SmallBlogCard blog={b} user={user} />
                                    </Box>
                                    )
                                } else if (i === loadedBlogs.length -1 ){
                                    return (
                                        <Box key={`${i}: ${b._id}`} className='pl-6 pr-6 flex flex-col gap-3 scrollable-item' sx = {{background: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)'}}>
    
                                        
                                            <div className='flex justify-center items-center'>
                                                <Button href={`/articles/categories/category/${b.categories[0].slug}`}>
                                                    <Typography variant='h2' className='font-bold gradient-text-three' sx={{fontSize: '1.75rem'}}>
                                                        {b.categories[0].name}
                                                    </Typography>                                            
                                                </Button>
    
                                            </div>      
    
                                        <SmallBlogCard blog={b}user={user}/>
                                    </Box>
                                    )
                                } else {
                                    return (
                                        <Box key={`${i}: ${b._id}`} className='pl-3  flex flex-col gap-3 scrollable-item'>
                                            <div className='flex justify-center items-center'>
                                                <Button href={`/articles/categories/category/${b.categories[0].slug}`}>
                                                    <Typography variant='h2' className='font-bold gradient-text-category' sx={{fontSize: '1.75rem'}}>
                                                        {b.categories[0].name}
                                                    </Typography>                                            
                                                </Button>
    
                                            </div>
                                            <SmallBlogCard blog={b} user={user} />
                                        </Box>
                                    )                                
                                }
    
                            })
                        }
                                    <div  ref={targetRef} className=''  >
                                        {loading && <div>Loading more blogs...</div>}
                                    </div> 
                    </div> 
            </div>
        )        
    }


}

export default TrendingPosts