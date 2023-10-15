import { Box, Button, Typography } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react'
import SubcategoryCard from '../category/SubcategoryCard';




const CategoriesContainer = ({category:{_id:id, name, slug, sub_categories, description, photo_landscape: p_wide, photo_portrait: p_long}}) => {
    const catContainerRef = useRef(null);

    useEffect(() => {
        const scrollContainer = catContainerRef.current;
    
        // Add an event listener to handle scroll snap on scroll end
        const handleScroll = () => {
        const scrollLeft = scrollContainer.scrollLeft;
        const containerWidth = scrollContainer.clientWidth;
        const subcategoryCards = scrollContainer.querySelectorAll('.scrollable-item');
    
        let nearestCard = null;
        let minDistance = Infinity;
    
        // Find the nearest project card based on scroll position
        subcategoryCards.forEach((card) => {
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
    <div className='w-[100%]'>
        <div>
            <Typography variant='h3' sx={{fontSize: "2.25em"}} className='font-bold gradient-text-home text-center'>
                {name} Categories
            </Typography>
        </div>

        <div  className='flex gap-6 overflow-x-auto w-screen  pb-6  scrollable-container'>
            {sub_categories.map((sc, i)=> {
                if(i === 0 ) {
                return (
                    <Box key={`${i}: ${sc._id}`} className='pl-3  flex flex-col gap-3 pb-6 pr-6 scrollable-item ' sx = {{background: 'linear-gradient(to right, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, 0) 100%)'}}>
                    <div className='flex justify-center items-center py-3'>
                        <Button href={`/articles/categories/category/${slug}/subcategories/subcategory/${sc.slug}`}>
                            <Typography variant='h2' className='gradient-text-category' sx={{fontSize: '1.75rem'}}>
                                {sc.name}
                            </Typography>                                            
                        </Button>

                    </div>

                        <SubcategoryCard subcategory={sc} category={slug} />
                </Box>
                )
                } else if ( i === sub_categories.length - 1) {
                return (
                    <Box key={`${i}: ${sc._id}`} className='pl-3  flex flex-col gap-3 pb-6 pr-6 scrollable-item' sx = {{background: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)'}}>
                    <div className='flex justify-center items-center py-3'>
                        <Button href={`/articles/categories/category/${slug}/subcategories/subcategory/${sc.slug}`}>
                            <Typography variant='h2' className='gradient-text-category' sx={{fontSize: '1.75rem'}}>
                                {sc.name}
                            </Typography>                                            
                        </Button>

                    </div>

                        <SubcategoryCard subcategory={sc} category={slug} />
                </Box>
                )
                }
                    return (
                        <Box key={`${i}: ${sc._id}`} className='pl-3  flex flex-col gap-3 pb-6 pr-6 scrollable-item' >
                        <div className='flex justify-center items-center py-3'>
                            <Button href={`/articles/categories/category/${slug}/subcategories/subcategory/${sc.slug}`}>
                                <Typography variant='h2' className='gradient-text-category' sx={{fontSize: '1.75rem'}}>
                                    {sc.name}
                                </Typography>                                            
                            </Button>

                        </div>

                            <SubcategoryCard subcategory={sc} category={slug} />
                    </Box>
                    )
            })}
        </div>  
        
    </div>
  )
}

export default CategoriesContainer