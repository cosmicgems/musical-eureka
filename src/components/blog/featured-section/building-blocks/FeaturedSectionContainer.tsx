import React, { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react';
import { Session } from 'src/utility/types/Session';
import FeaturedSectionHeader from './FeaturedSectionHeader';
import { ScrollableContainer } from '@components/Store/UI';
import { Box, Button, Typography } from '@mui/material';
import FeaturedCard from './FeaturedCard';
import { grey } from '@mui/material/colors';
import { BottomDivider, TopDivider } from '@components/shape-dividers';

const FeaturedSectionContainer = ({
    featuredPosts,
    user,
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    
    const featuredRef = useRef(null);

    const handleHeroNav = (direction:string) => {
        
        if (featuredRef.current) {
            if (direction === 'left') {
                featuredRef.current.scrollLeft -= 800;
            }
            if (direction === 'right') {
                featuredRef.current.scrollLeft += 800;
            }
        }

    }

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
                const indexInView = featuredPosts.findIndex((b) => b._id === entry.target.id);
                if (indexInView !== -1) {
                setActivePostIndex(indexInView); // Update the active post index
                }
            }
            });
        };
    
        // Create an IntersectionObserver for each post
        const observers = featuredPosts.map((post) => {
            const observer = new IntersectionObserver(callback, options);
            observer.observe(document.getElementById(post._id)); // Observe each post element
            return observer;
        });
    
        return () => {
            // Disconnect observers on unmount
            observers.forEach((observer) => observer.disconnect());
        };
    }, [featuredPosts]);

    return (
        <Box className='md:flex md:flex-col flex-row w-screen items-center relative py-[20vh]'
        sx={{bgcolor: grey[800]}}
        >

            <TopDivider />
            
                <FeaturedSectionHeader  />
            
            
            
                <ScrollableContainer
                data={featuredPosts}
                type={`articles`}
                handleHeroNav={handleHeroNav}
                heroRef={featuredRef}
                >
                    {
                        featuredPosts.map((post,i) =>(
                            <div  key={post._id} id={post._id} ref={(el) => (dotsRef.current[post._id] = el)}>
                                <Box  className='pl-3  flex flex-col  gap-3 pb-6 pr-6 snap-center z-10' >

                                    <div className='flex justify-center items-center py-1'>

                                        <Button href={`/articles/categories/category/${post.categories[0].slug}`}>
                                            <Typography variant='h6' className='gradient-text' sx={{color: grey[500]}} >
                                                {post.categories[0].name}
                                            </Typography>                                            
                                        </Button>

                                    </div>

                                    <FeaturedCard blog={post} user={user} />

                                </Box>
                            </div>

                        ))
                    }
                </ScrollableContainer>

                <div className='flex gap-3 w-full justify-center md:hidden'>
                    {featuredPosts.map(({ _id: id }, index) => (
                    <Box
                        key={`${id} dots`}
                        className={`rounded-full h-[15px] w-[15px] ${activePostIndex === index ? 'active-dot' : ''}`}
                        sx={{ bgcolor: grey[50] }}
                        ref={(el) => (dotsRef.current[id] = el)} // Ref for each dot
                    />
                    ))}
                </div>                
            
            <BottomDivider/>

        </Box>
    )
}

export default FeaturedSectionContainer