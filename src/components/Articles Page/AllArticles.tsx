import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Box, Button, Typography } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { grey } from '@mui/material/colors';
import BlogPost from '../blog/BlogPost';
import { FeaturedCard } from '@components/blog/featured-section/building-blocks'; 
import { ScrollableContainer } from '@components/Store/UI';
import { AllArticlesHeader } from '@components/blog/all-articles';
import { BottomDivider, TopDivider } from '@components/shape-dividers';

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


const AllArticles = ({blogs:initialBlogs, totalBlogCount, user}) => {

    const {data: session, status} =  useSession() as Session;
    const [loading, setLoading] = useState<boolean>(false);
    const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
    const [page, setPage] = useState<number>(1);
    const [loadedBlogs, setLoadedBlogs] = useState<Blog[]>([])
    const [loadedBlogCount, setLoadedBlogCount] = useState<number>(blogs.length)

    const scrollTrendContainerRef = useRef(null);
    const articlesRef = useRef(null);
    const blogsPerPage = 5;

    
    const handleArticlesNav = (direction:string) => {
        
        if (articlesRef.current) {
            if (direction === 'left') {
                articlesRef.current.scrollLeft -= 800;
            }
            if (direction === 'right') {
                articlesRef.current.scrollLeft += 800;
            }
        }

    }




    
    const loadMoreBlogs = useCallback(async () => {
        try {
            const nextPage = page + 1;
            if (loadedBlogCount < totalBlogCount) {
                setLoading(true);
                const res = await axios.get(`/api/blog/post/get-all-home?page=${nextPage}&limit=${blogsPerPage}`);
                const newBlogs = res.data.blogs.blogs;
                // setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
                setLoadedBlogs(prevLoadedBlogs => prevLoadedBlogs.concat(newBlogs));
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
        if(!articlesRef?.current) return;
        // console.log(loadedBlogCount);
        
        if(loadedBlogCount >= totalBlogCount) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    
                    // Load more blogs when the target div becomes visible
                    loadMoreBlogs();
                }
            },
            { threshold: .9 } // Adjust the threshold as needed
        );

        if (articlesRef.current) {
            observer.observe(articlesRef.current);
        }

        return () => {
            if (articlesRef.current) {
                observer.unobserve(articlesRef.current);
            }
        };
    }, [page, loadMoreBlogs,totalBlogCount, loadedBlogCount]);


    if (status === "loading"){
        return <h3 className='gradient-text' >Loading...</h3>
    } else {
        return (
    <Box className='md:flex md:flex-col flex-row w-screen items-center relative py-[20vh]' 
    sx={{bgcolor: grey[800]}}
    >
        <TopDivider />
        <AllArticlesHeader />
    {/* <div>
        <Typography variant='h1' className=' gradient-text-home text-center' sx={{color: grey[50], fontSize: {xs:"3rem"}}}>
            All Posts
        </Typography>
    </div> */}

    <ScrollableContainer
    data={blogs}
    type={`all-articles`}
    handleHeroNav={handleArticlesNav}
    heroRef={articlesRef}
    >
        {blogs.map((b, i)=> {
            if(i === 0) {
                return (
                    <Box key={`${i}: ${b._id}`} className='pl-3  flex flex-col gap-3 pb-6 pr-6 scrollable-item' sx = {{}}>
                    <div className='flex justify-center items-center'>
                        <Button href={`/articles/categories/category/${b.categories[0].slug}`}>
                            <Typography variant='h6' className='font-bold gradient-text' sx={{}}>
                                {b.categories[0].name}
                            </Typography>                                            
                        </Button>

                    </div>
                    <FeaturedCard blog={b} user={user} />
                </Box>
                )
            } else if (i === blogs.length -1 ){
                return (
                    <Box key={`${i}: ${b._id}`} className='pl-6 pr-6 flex flex-col gap-3 scrollable-item' sx = {{}}>

                    
                        <div className='flex justify-center items-center'>
                            <Button href={`/articles/categories/category/${b.categories[0].slug}`}>
                                <Typography variant='h6' className={loadedBlogs.length === 0 ? `font-bold gradient-text-three` :  `font-bold gradient-text`} sx={{}}>
                                    {b.categories[0].name}
                                </Typography>                                            
                            </Button>

                        </div>      

                    <FeaturedCard blog={b}user={user}/>
                </Box>
                )
            } else {
                return (
                    <Box key={`${i}: ${b._id}`} className='pl-3  flex flex-col gap-3 scrollable-item'>
                        <div className='flex justify-center items-center'>
                            <Button href={`/articles/categories/category/${b.categories[0].slug}`}>
                                <Typography variant='h6' className='font-bold gradient-text' sx={{}}>
                                    {b.categories[0].name}
                                </Typography>                                            
                            </Button>

                        </div>
                        <FeaturedCard blog={b} user={user} />
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
                                <Typography variant='h6' className='font-bold gradient-text' sx={{}}>
                                    {b.categories[0].name}
                                </Typography>                                            
                            </Button>

                        </div>
                        <FeaturedCard blog={b} user={user} />
                    </Box>
                    )
                } else if (i === loadedBlogs.length -1 ){
                    return (
                        <Box key={`${i}: ${b._id}`} className='pl-6 pr-6 flex flex-col gap-3 scrollable-item' sx = {{}}>

                        
                            <div className='flex justify-center items-center'>
                                <Button href={`/articles/categories/category/${b.categories[0].slug}`}>
                                    <Typography variant='h6' className='font-bold gradient-text-three' sx={{}}>
                                        {b.categories[0].name}
                                    </Typography>                                            
                                </Button>

                            </div>      

                        <FeaturedCard blog={b}user={user}/>
                    </Box>
                    )
                } else {
                    return (
                        <Box key={`${i}: ${b._id}`} className='pl-3  flex flex-col gap-3 scrollable-item'>
                            <div className='flex justify-center items-center'>
                                <Button href={`/articles/categories/category/${b.categories[0].slug}`}>
                                    <Typography variant='h6' className='font-bold gradient-text' sx={{}}>
                                        {b.categories[0].name}
                                    </Typography>                                            
                                </Button>

                            </div>
                            <FeaturedCard blog={b} user={user} />
                        </Box>
                    )                                
                }

            })
        }
        {
            totalBlogCount === loadedBlogCount ?
            null :
                <div  ref={articlesRef} className=''  >
                    {loading && <div>Loading more blogs...</div>}
                </div>                             
        }
    </ScrollableContainer>

        <BottomDivider />
    </Box>
    )
    }
}

export default AllArticles