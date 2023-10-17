import React, { useEffect, useRef, useState } from 'react'
import CoreValue from './CoreValue'
import { coreValuesItems } from '../../../../../public/assets/coreValueItems'
import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

const CoreValuesContainer = () => {
    const [coreValue, setCoreValue] = useState<any>(null);
    const [tapped, setTapped] = useState<boolean>(false);
    
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


    const handleTap = (c) => {
        
        if (coreValue?._id === c._id){
            setCoreValue(null);
            setTapped(null);
            return
        }
        else if(coreValue === null || coreValue !== null ){
            setCoreValue(c);
            setTapped(true);
            return
        } 
    }

  return (
    <div className='flex flex-col gap-3'>

        <div className='flex flex-row  overflow-x-auto w-full scrollable-container'>
            
            { coreValuesItems.map((c, i) => (
                <div key={c._id} className='p-3 scrollable-item'>
                    <CoreValue onTap={handleTap} c={c} />
                </div>
            ))}

        </div>

        {
            tapped &&
            <div className='p-3 flex flex-col gap-3 justify-center items-center'>
                <Typography variant='h3' className='gradient-text text-center' sx={{fontSize: '2rem'}}>
                    {coreValue.name.toUpperCase()}
                </Typography>
                <Typography variant='h2' className=' text-center md:w-2/3' sx={{color: grey[50], fontSize: '1.15rem'}}>
                    {coreValue.description}
                </Typography>
            </div>            
        }


    </div>

  )
}

export default CoreValuesContainer