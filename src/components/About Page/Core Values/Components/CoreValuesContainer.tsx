import React, { useEffect, useRef, useState } from 'react'
import CoreValue from './CoreValue'
import { coreValuesItems } from '../../../../../public/assets/coreValueItems'
import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';

const CoreValuesContainer = () => {
    const [coreValue, setCoreValue] = useState<any>(null);
    const [tapped, setTapped] = useState<boolean>(false);
    const [activeStep, setActiveStep] = useState(0);
    const [totalSteps, setTotalSteps] = useState<number>(coreValuesItems.length);
    
    const scrollTrendContainerRef = useRef(null);

    // useEffect(() => {
    //     const scrollContainer = scrollTrendContainerRef.current;

    //     if (scrollContainer) {
    //         scrollContainer.addEventListener('scroll', handleScroll);
    //     }

    //     return () => {
    //         if (scrollContainer) {
    //             scrollContainer.removeEventListener('scroll', handleScroll);
    //         }
    //     };

    //     function handleScroll() {
    //         const scrollLeft = scrollContainer.scrollLeft;
    //         const containerWidth = scrollContainer.clientWidth;
    //         const trendingCards = scrollContainer.querySelectorAll('.scrollable-item');

    //         let nearestIndex = null;
    //         let minDistance = Infinity;

    //         // Find the nearest project card based on scroll position
    //         trendingCards.forEach((card, index) => {
    //             const cardRect = card.getBoundingClientRect();
    //             const distance = Math.abs(cardRect.left - scrollLeft);

    //             if (distance < minDistance) {
    //                 minDistance = distance;
    //                 nearestIndex = index;
    //             }
    //         });

    //         // Snap to the nearest project card
    //         if (nearestIndex !== null) {
    //             scrollContainer.scrollTo({
    //                 left: trendingCards[nearestIndex].offsetLeft,
    //                 right: trendingCards[nearestIndex].offsetRight,
    //                 behavior: 'smooth',
    //             });

    //             // Set the current step to the index of the nearest card
    //             setActiveStep(nearestIndex);
    //         }
    //     }
    // }, []);


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

        <div ref={scrollTrendContainerRef} className='flex flex-row   scrollable-container gap-3'>
            
            
            { coreValuesItems.map((c, i) => (
                <div key={c._id} className='p-3 scrollable-item'>
                    <CoreValue onTap={handleTap} c={c} />
                </div>
            ))}

        </div>

        {/* <div className='flex gap-1 justify-center items-center md:hidden'>
                { coreValuesItems.map((c,i) => {
                    return (
                    <div key={c._id}>
                        {activeStep === i ? 
                            <CircleIcon sx={{color:grey[50]}} /> : <CircleOutlinedIcon sx={{color:grey[50]}} />
                        }
                    </div>
                )
                })}
        </div> */}


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