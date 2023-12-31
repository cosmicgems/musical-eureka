import { Box, Button, Typography } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react'
import SubcategoryCard from '../category/SubcategoryCard';
import { grey } from '@mui/material/colors';
import { CategoryCard, CategoryHeader } from '@components/blog/category';
import { ScrollableContainer } from '@components/Store/UI';
import { BottomDivider, TopDivider } from '@components/shape-dividers';




const CategoriesContainer = ({category:{_id:id, name, slug, sub_categories, description, photo_landscape: p_wide, photo_portrait: p_long}}) => {

    
    const categoryRef = useRef(null);

    const handleCategoryNav = (direction:string) => {
        
        if (categoryRef.current) {
            if (direction === 'left') {
                categoryRef.current.scrollLeft -= 800;
            }
            if (direction === 'right') {
                categoryRef.current.scrollLeft += 800;
            }
        }

    }

    return (
        <Box className='md:flex md:flex-col flex-row w-screen items-center relative py-[20vh]'
        sx={{bgcolor: grey[800]}}
        >

            <TopDivider />

            <CategoryHeader name={name} />
            <ScrollableContainer 
            data={sub_categories}
            type={`articles`}
            handleHeroNav={handleCategoryNav}
            heroRef={categoryRef}
            >
                {sub_categories.map((sc, i)=> {

                        return (
                            <Box key={`${i}: ${sc._id}`} className='pl-3  flex flex-col gap-3 pb-6 pr-6 snap-center justify-center' >
                                <div className='flex justify-center items-center py-3'>
                                    <Button href={`/articles/categories/category/${slug}/subcategories/subcategory/${sc.slug}`}>
                                        <Typography variant='h6' className='text-center' sx={{color:grey[50]}}>
                                            {sc.name}
                                        </Typography>                                            
                                    </Button>

                                </div>

                                <CategoryCard subcategory={sc} category={slug} />
                        </Box>
                        )

                })}
            </ScrollableContainer> 

            <BottomDivider />
            
        </Box>
    )
}

export default CategoriesContainer