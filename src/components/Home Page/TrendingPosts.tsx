import { Box, Button, Typography } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import SmallBlogCard from '../blog/SmallBlogCard'
import axios from 'axios';



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


const TrendingPosts = ({blogs:initialBlogs, totalBlogCount}) => {
    const targetRef = useRef();
    const [loading, setLoading] = useState<boolean>(false);
    const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
    const [page, setPage] = useState<number>(1); // Keep track of the page number
    const blogsPerPage = 5;
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
    

  return (
    <div>
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
  )
}

export default TrendingPosts