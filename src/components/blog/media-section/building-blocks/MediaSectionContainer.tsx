import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { useEffect, useRef, useState } from 'react'
import MediaSectionHeader from './MediaSectionHeader'
import MediaCard from './MediaCard'
import { ScrollableContainer } from '@components/Store/UI'

const MediaSectionContainer = ({videos}) => {
    

    const mediaRef = useRef(null);

    const handleHeroNav = (direction:string) => {
        
        if (mediaRef.current) {
            if (direction === 'left') {
                mediaRef.current.scrollLeft -= 800;
            }
            if (direction === 'right') {
                mediaRef.current.scrollLeft += 800;
            }
        }

    };
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
                const indexInView = videos.findIndex((b) => b.id === entry.target.id);
                if (indexInView !== -1) {
                setActivePostIndex(indexInView); // Update the active post index
                }
            }
            });
        };
    
        // Create an IntersectionObserver for each post
        const observers = videos.map((post) => {
            const observer = new IntersectionObserver(callback, options);
            observer.observe(document.getElementById(post.id)); // Observe each post element
            return observer;
        });
    
        return () => {
            // Disconnect observers on unmount
            observers.forEach((observer) => observer.disconnect());
        };
    }, [videos]);

    return (
        <Box className='w-full sm:h-full md:flex md:items-center' sx={{}}>
            <MediaSectionHeader />
                        
            <ScrollableContainer
                data={videos}
                type={`videos`}
                handleHeroNav={handleHeroNav}
                heroRef={mediaRef}
                >
                
                {
                    videos.map((v, i) => (
                            <div className='snap-center' key={v.id} id={v.id} ref={(el) => (dotsRef.current[v.id] = el)}>
                                <MediaCard video={v} />
                            </div>
                        )
                    )
                }

            </ScrollableContainer>

            <div className='flex gap-3 w-full justify-center md:hidden'>
                {videos.map(({ id }, index) => {
                    
                    return <Box
                        key={`${id} dots`}
                        className={`rounded-full h-[15px] w-[15px] ${activePostIndex === index ? 'active-dot' : ''}`}
                        sx={{ bgcolor: grey[50] }}
                        ref={(el) => (dotsRef.current[id] = el)} // Ref for each dot
                    />
                })}
            </div> 
        </Box>
    )
}

export default MediaSectionContainer