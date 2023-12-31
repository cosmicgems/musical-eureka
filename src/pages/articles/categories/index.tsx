import { Box, Button, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState, useRef, useEffect } from 'react'
import { Layout } from '@components/big-three-components';
import { CategoryCard, CategoryHeader } from '@components/blog/categories';
import connectDB from '../../../../lib/connectDB';
import SubCategory from '../../../../lib/models/sub_category';
import Category from '../../../../lib/models/category';
import SearchResults from '../../../components/Search Bar/SearchResults';
import { ScrollableContainer } from '@components/Store/UI';
import { BottomDivider, TopDivider } from '@components/shape-dividers';

const CategoriesPage = ({categories}) => {
    const [homeSearch, setHomeSearch] = useState<string>("");
    const scrollContainerRef = useRef(null);

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
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
    
        // Add an event listener to handle scroll snap on scroll end
        const handleScroll = () => {
        const scrollLeft = scrollContainer.scrollLeft;
        const containerWidth = scrollContainer.clientWidth;
        const categoryCards = scrollContainer.querySelectorAll('.scrollable-item');
    
        let nearestCard = null;
        let minDistance = Infinity;
    
        // Find the nearest project card based on scroll position
        categoryCards.forEach((card) => {
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
        <Box className='' sx={{bgcolor: grey[100]}}>


            <Layout >
                <div className='min-h-screen sm:min-h-[80vh] flex flex-col justify-between items-center gap-6 pt-12 sm:pt-0'>
                <div className='flex flex-col justify-center items-center sm:w-3/4  px-6 sm:mt-6  mb-6'>
                        <div>
                            <Typography variant='h2' className=' gradient-text-home text-subcategories text-center' sx={{color: grey[50], }}>
                                Pearl Box
                            </Typography>
                        </div>
                        <div>
                            <Typography variant='body1' className=' gradient-text-subcategories text-subcategories mb-6' sx={{color: grey[50], fontSize: {xs:"1rem"}}}>
                                Curate a lifestyle worth living.
                            </Typography>
                        </div>
                        

                    </div>
                    <div>

                    </div>
                        <Box className='md:flex md:flex-col flex-row w-screen items-center relative py-[20vh]'
                        sx={{bgcolor: grey[800]}}>

                            <TopDivider/>

                            <CategoryHeader/>

                            <ScrollableContainer
                            data={categories}
                            type={`categories`}
                            handleHeroNav={handleCategoryNav}
                            heroRef={categoryRef}
                            >
                                {categories.map((c, i)=> {
                                    
                                        return (
                                            <Box key={`${i}: ${c._id}`} className='pl-3  flex flex-col gap-3 pb-6 pr-6 scrollable-item'>
                                            <div className='flex justify-center items-center'>
                                                <Button href={`/articles/categories/category/${c.slug}`}>
                                                    <Typography variant='h6' component="div" className='font-bold ' sx={{color:grey[50]}}>
                                                        {c.name}
                                                    </Typography>                                            
                                                </Button>

                                            </div>

                                                <CategoryCard category={c} />
                                        </Box>
                                        )
                                })}
                            </ScrollableContainer>      
                            <BottomDivider />
                        </Box>


                </div>

            </Layout>        
        </Box>
    )
}



export async function getStaticProps() {
    try {

        await connectDB();

        await SubCategory.find({});

        const categoriez = await Category.find({})
                                        .populate("sub_categories");

        const categories = JSON.parse(JSON.stringify(categoriez))
        return {
        props: { categories },
        };        
    } catch (error) {
        return {
            props: { categories : [] },
            };           
    }


}

export default CategoriesPage