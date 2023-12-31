import { Box, Button, Typography } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import TrendingHeader from './TrendingHeader'
import { ScrollableContainer } from '@components/Store/UI'
import TrendingCard from './TrendingCard'
import { BlogType } from 'src/utility/types/Blog'
import axios from 'axios'
import { BottomDivider, TopDivider } from '@components/shape-dividers'
import { grey } from '@mui/material/colors'

const TrendingSectionContainer = ({
    totalBlogCount,
    blogs: initialBlogs,
    user
}) => {

    const targetRef = useRef(null);
    const trendingRef = useRef(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [trendingPosts, setTrendingPosts] = useState<BlogType[]>(initialBlogs);
    const [page, setPage] = useState<number>(1); // Keep track of the page number
    const blogsPerPage = 5;
    const [loadedBlogs, setLoadedBlogs] = useState<BlogType[]>([])
    const [loadedBlogCount, setLoadedBlogCount] = useState<number>(trendingPosts.length)

    
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

    
    const [activePostIndex, setActivePostIndex] = useState(0); // State to track the active post
    const dotsRef = useRef([]); // Ref for dot elements
  
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };
    
        const callback = (entries) => {
            entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Find the index of the post currently in view
                const indexInView = trendingPosts.findIndex((b) => b._id === entry.target.id);
                if (indexInView !== -1) {
                setActivePostIndex(indexInView); // Update the active post index
                }
            }
            });
        };
    
        // Create an IntersectionObserver for each post
        const observers = trendingPosts.map((post) => {
            const observer = new IntersectionObserver(callback, options);
            observer.observe(document.getElementById(post._id)); // Observe each post element
            return observer;
        });
    
        return () => {
            // Disconnect observers on unmount
            observers.forEach((observer) => observer.disconnect());
        };
    }, [trendingPosts]);

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
        }

        return () => {
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        };
    }, [page, loadMoreBlogs,totalBlogCount, loadedBlogCount]);

    const handleHeroNav = (direction:string) => {
        
        if (trendingRef.current) {
            if (direction === 'left') {
                trendingRef.current.scrollLeft -= 800;
            }
            if (direction === 'right') {
                trendingRef.current.scrollLeft += 800;
            }
        }

    }

    return (

        <Box className='md:flex flex-row w-screen items-center pt-[20vh] pb-[25vh] relative'
        sx={{bgcolor: grey[800]}}
        >
            <TopDivider />
            <TrendingHeader />

            <ScrollableContainer 
            data={trendingPosts}
            handleHeroNav={handleHeroNav}
            heroRef={trendingRef}
            type={`trending`}
            >
                
                {/* {
                trendingPosts.map((b, i)=> {
                        return (
                            <div key={`${i}: ${b._id}`}>
                                <Box className='   flex flex-col gap-6 px-3    snap-center w-screen' sx = {{}}>
                                    <div className='flex justify-center items-center w-full md:w-auto'>
                                        <Button href={`/articles/categories/category/${b.categories[0].slug}`}>
                                            <Typography variant='h6' className='font-bold gradient-text text-center' sx={{}}>
                                                {b.categories[0].name}
                                            </Typography>                                            
                                        </Button>

                                    </div>
                                    <TrendingCard blog={b} user={user} />
                                </Box>                                
                            </div>

                        )

                    })
                } */}

                
                {
                    trendingPosts.map((b, i) => (
                        <div key={b._id} id={b._id} ref={(el) => (dotsRef.current[b._id] = el)}>
                            <Box className='   flex flex-col gap-6 px-3    snap-center w-screen md:w-auto' sx = {{}}>
                                <div className='flex justify-center items-center '>
                                    <Button href={`/articles/categories/category/${b.categories[0].slug}`}>
                                        <Typography variant='h6' className='font-bold gradient-text text-center' sx={{}}>
                                            {b.categories[0].name}
                                        </Typography>                                            
                                    </Button>

                                </div>
                                <TrendingCard blog={b} user={user} />
                            </Box>                                
                        </div>
                ))}
                {
                    loadedBlogCount < totalBlogCount &&
                    <div  ref={targetRef} className=''  >
                        {loading && <div>Loading more blogs...</div>}
                    </div>                             
                }

            </ScrollableContainer>
            <div className='flex gap-3 w-full justify-center md:hidden'>
                {trendingPosts.map(({ _id: id }, index) => (
                <Box
                    key={`${id} dots`}
                    className={`rounded-full h-[15px] w-[15px] ${activePostIndex === index ? 'active-dot' : ''}`}
                    sx={{ bgcolor: grey[50] }}
                    ref={(el) => (dotsRef.current[id] = el)} // Ref for each dot
                />
                ))}
            </div>

            <BottomDivider />
        </Box>        

    )
}

export default TrendingSectionContainer