import React, { useState } from 'react'
import axios from 'axios'
import Layout from '../../../../../components/Layout'
import { Box, Button, TextField, Typography } from '@mui/material'
import CategoryCard from '../../../../../components/category/CategoryCard'
import { grey } from '@mui/material/colors'
import Subscribe from '../../../../../components/Subscribe'
import SubcategoryCard from '../../../../../components/category/SubcategoryCard'
import { API, DOMAIN, APP_NAME } from "../../../../../../config";

const SlugCategoryPage = ({category:{_id:id, name, slug, sub_categories, description, photo_landscape: p_wide, photo_portrait: p_long}}, posts) => {

    console.log(posts);
    
    const [homeSearch, setHomeSearch] = useState<string>("");

    return (    
        <Box className='' sx={{bgcolor: grey[100]}}>


            <Layout >
                <div className='min-h-screen sm:min-h-[80vh]  w-full flex flex-col  items-center gap-6 pt-12 sm:pt-0'>
                    <div className='w-full'>
                        <Subscribe/>
                    </div>
                    <div className='flex flex-col justify-center items-center sm:w-3/4  px-6 sm:gap-6'>
                        <div>
                            <Typography variant='h1' className=' gradient-text-home text-center' sx={{color: grey[50], fontSize: {xs:"3rem", sm:"5rem"}}}>
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
                            <Typography variant='h3' sx={{fontSize: "2.25em"}} className='font-bold gradient-text-home'>
                                {name} Categories
                            </Typography>
                        </div>
                    </div>
                        <div className='flex gap-6 overflow-x-auto w-screen pb-6 sm:justify-between'>
                            {sub_categories.map((sc, i)=> {
                                if(i === 0 ) {
                                return (
                                    <Box key={`${i}: ${sc._id}`} className='pl-3  flex flex-col gap-3 pb-6 pr-6 ' sx = {{background: 'linear-gradient(to right, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, 0) 100%)'}}>
                                    <div className='flex justify-center items-center py-3'>
                                        <Button href={`/articles/categories/category/${sc.slug}`}>
                                            <Typography variant='h2' className='gradient-text-category' sx={{fontSize: '1.75rem'}}>
                                                {sc.name}
                                            </Typography>                                            
                                        </Button>

                                    </div>

                                        <SubcategoryCard subcategory={sc} />
                                </Box>
                                )
                                } else if ( i === sub_categories.length - 1) {
                                return (
                                    <Box key={`${i}: ${sc._id}`} className='pl-3  flex flex-col gap-3 pb-6 pr-6 ' sx = {{background: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)'}}>
                                    <div className='flex justify-center items-center py-3'>
                                        <Button href={`/articles/categories/category/${sc.slug}`}>
                                            <Typography variant='h2' className='gradient-text-category' sx={{fontSize: '1.75rem'}}>
                                                {sc.name}
                                            </Typography>                                            
                                        </Button>

                                    </div>

                                        <SubcategoryCard subcategory={sc} />
                                </Box>
                                )
                                }
                                    return (
                                        <Box key={`${i}: ${sc._id}`} className='pl-3  flex flex-col gap-3 pb-6 pr-6 ' >
                                        <div className='flex justify-center items-center py-3'>
                                            <Button href={`/articles/categories/category/${sc.slug}`}>
                                                <Typography variant='h2' className='gradient-text-category' sx={{fontSize: '1.75rem'}}>
                                                    {sc.name}
                                                </Typography>                                            
                                            </Button>

                                        </div>

                                            <SubcategoryCard subcategory={sc} />
                                    </Box>
                                    )
                            })}
                        </div>                
                </div>

            </Layout>        
        </Box>
    )
}

export default SlugCategoryPage

export const getAllCategorySlugs = async () => {
    try {
      const response = await axios.get(`${API}/api/blog/category/get-all-slugs`);
      return response.data.categories.map((category) => category.slug);
    } catch (error) {
      console.error('Error fetching category slugs:', error);
      return [];
    }
  };
  

  export const getCategoryAndPostsBySlug = async (slug) => {
    try {
        const categoryResponse = await axios.get(`${API}/api/blog/category/${slug}`);
        const category = categoryResponse.data.category;
    
        const postsResponse = await axios.get(`${API}/api/blog/post/get-all-by-subcategory-slug?slug=${slug}`);
        const posts = postsResponse.data.desired_posts;
    
        return { category, posts };
    } catch (error) {
        console.error(`Error fetching data for slug ${slug}:`, error);
      return { category: {}, posts: [] }; // Return empty data or handle the error as needed
    }
};

    export const getStaticPaths = async () => {
        const slugs = await getAllCategorySlugs();
    
        const paths = slugs.map((name) => ({
            params: { name },
        }));
    
        return {
            paths,
            fallback: 'blocking',
        };
    };

  export const getStaticProps = async ({ params: { name } }) => {
    const { category, posts } = await getCategoryAndPostsBySlug(name);
  
    return {
      props: { category, posts },
    };
  };