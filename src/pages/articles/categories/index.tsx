import { Box, Button, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState, useRef, useEffect } from 'react'
import Layout from '../../../components/Layout';
import CategoryCard from '../../../components/category/CategoryCard';
import connectDB from '../../../../lib/connectDB';
import SubCategory from '../../../../lib/models/sub_category';
import Category from '../../../../lib/models/category';

const CategoriesPage = ({categories}) => {
    const [homeSearch, setHomeSearch] = useState<string>("");
    const scrollContainerRef = useRef(null);

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
                    <div className='flex flex-col justify-center items-center sm:w-3/4  px-6 sm:gap-6'>
                        <div>
                            <Typography variant='h1' className=' gradient-text-home text-center' sx={{color: grey[50], fontSize: {xs:"5rem"}}}>
                                Pearl Box
                            </Typography>
                        </div>
                        <div className='w-full flex gap-0 mb-6'>
                            <TextField fullWidth variant='outlined' sx={{bgcolor:grey[50], borderTopLeftRadius: '5px', borderBottomLeftRadius: "5px", borderTopRightRadius: "0px", borderBottomRightRadius:"0px"}} label="Search for pearls..." className='' value={homeSearch} onChange={(e)=> {setHomeSearch(e.target.value)}} />
                            <Button variant='contained' sx={{borderTopLeftRadius:0, borderBottomLeftRadius:0,}}>
                                Search
                            </Button>
                        </div>
                        <div>
                            <Typography variant='h3' sx={{fontSize: "3rem"}} className='font-bold gradient-text-subcategories'>
                                Categories
                            </Typography>
                        </div>
                    </div>
                        <div className='flex gap-6 overflow-x-auto w-screen pb-6 scrollable-container'>
                            {categories.map((c, i)=> {
                                if (i === 0 ) {
                                    return (
                                        <Box key={`${i}: ${c._id}`} className='pl-3  flex flex-col gap-3 pb-6 pr-6 scrollable-item' sx = {{background: 'linear-gradient(to right, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, 0) 100%)'}}>
                                        <div className='flex justify-center items-center'>
                                            <Button href={`/articles/categories/category/${c.slug}`}>
                                                <Typography variant='h2' className='font-bold gradient-text-category' sx={{fontSize: '1.75rem'}}>
                                                    {c.name}
                                                </Typography>                                            
                                            </Button>

                                        </div>

                                            <CategoryCard category={c} />
                                    </Box>
                                    )                                
                                } else if ( i === categories.length -1) {
                                    return (
                                        <Box key={`${i}: ${c._id}`} className='pl-3  flex flex-col gap-3 pb-6 pr-6 scrollable-item' sx = {{background: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)'}}>
                                        <div className='flex justify-center items-center'>
                                            <Button href={`/articles/categories/category/${c.slug}`}>
                                                <Typography variant='h2' className='font-bold gradient-text-three' sx={{fontSize: '1.75rem'}}>
                                                    {c.name}
                                                </Typography>                                            
                                            </Button>

                                        </div>

                                            <CategoryCard category={c} />
                                    </Box>
                                    )                                
                                }
                                    return (
                                        <Box key={`${i}: ${c._id}`} className='pl-3  flex flex-col gap-3 pb-6 pr-6 scrollable-item'>
                                        <div className='flex justify-center items-center'>
                                            <Button href={`/articles/categories/category/${c.slug}`}>
                                                <Typography variant='h2' className='font-bold gradient-text-category' sx={{fontSize: '1.75rem'}}>
                                                    {c.name}
                                                </Typography>                                            
                                            </Button>

                                        </div>

                                            <CategoryCard category={c} />
                                    </Box>
                                    )
                            })}
                        </div>                
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