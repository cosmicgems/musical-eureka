import { Box, Typography } from '@mui/material'
import React, { useRef, useEffect} from 'react'
import VideoCard from '../VideoCard'
import { grey } from '@mui/material/colors';

const YoutubeVideos = ({videos}) => {
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
    
        // Add an event listener to handle scroll snap on scroll end
        const handleScroll = () => {
        const scrollLeft = scrollContainer.scrollLeft;
        const containerWidth = scrollContainer.clientWidth;
        const youtubeCards = scrollContainer.querySelectorAll('.scrollable-item');
    
        let nearestCard = null;
        let minDistance = Infinity;
    
        // Find the nearest project card based on scroll position
        youtubeCards.forEach((card) => {
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

  return (
    <Box className='w-full sm:h-full' sx={{bgcolor:grey[800]}}>

        <div className='w-[100%] py-6'>
            <Typography variant='h3' sx={{}} className=' text-center gradient-text-three'>
                Media
            </Typography>
        </div>

        <div ref={scrollContainerRef} className='w-[100%]'>
            {
                videos?.length > 0 ?
                    <div   className='flex gap-6 overflow-x-auto  pb-6  scrollable-container px-6'>
                        {videos.map((v, i) => {
                            if (videos.length > 0) {
                                return(
                                    <div key={i} className='p-3 scrollable-item'>
                                        <VideoCard video={v} />
                                    </div>
                                )                                    
                            } else if (videos.length <= 0) {
                            return(
                                <div key="none" className='p-3 scrollable-item'>
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


    </Box>
  )
}

export default YoutubeVideos