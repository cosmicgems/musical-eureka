import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Layout from '../../../../../components/Layout'
import { Box, Button, TextField, Typography } from '@mui/material'
import CategoryCard from '../../../../../components/category/CategoryCard'
import { grey } from '@mui/material/colors'
import Subscribe from '../../../../../components/Subscribe'
import SubcategoryCard from '../../../../../components/category/SubcategoryCard'
import { API, DOMAIN, APP_NAME } from "../../../../../../config";
import connectDB from '../../../../../../lib/connectDB'
import SubCategory from '../../../../../../lib/models/sub_category'
import Category from '../../../../../../lib/models/category'
import Blog from '../../../../../../lib/models/blog'
import SearchResults from '../../../../../components/Search Bar/SearchResults'
import CategoriesContainer from '../../../../../components/Category Page/CategoriesContainer'

const SlugCategoryPage = ({category}, posts) => {

    console.log(posts);
    
    const [homeSearch, setHomeSearch] = useState<string>("");

    return (    
        <Box className='' sx={{bgcolor: grey[100]}}>


            <Layout >
                <div className='min-h-screen sm:min-h-[80vh]  w-full flex flex-col  items-center gap-6 pt-12 sm:pt-0'>
                <div className='flex flex-col justify-center items-center sm:w-3/4  px-6 sm:mt-6  mb-6'>
                        <div>
                            <Typography variant='h1' className=' gradient-text-home text-subcategories' sx={{color: grey[50], fontSize: {xs:"5rem"}}}>
                                Pearl Box
                            </Typography>
                        </div>
                        <div>
                            <Typography variant='body1' className=' gradient-text-subcategories text-subcategories mb-6' sx={{color: grey[50], fontSize: {xs:"1rem"}}}>
                                Curate a lifestyle worth living.
                            </Typography>
                        </div>
                        <SearchResults />

                    </div>
                    <div>
                        <CategoriesContainer category={category} />   
                    </div>

                </div>

            </Layout>        
        </Box>
    )
}

export default SlugCategoryPage



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
        try {
            await connectDB()
            await SubCategory.find({});

            const categories = await Category.find({})
                                            .populate("sub_categories");

            const slugs = categories.map((category) => category.slug);

            const paths = slugs.map((name) => ({
                        params: { name },
                    }));
                
                    return {
                        paths,
                        fallback: 'blocking',
                    };
        } catch (error) {
            console.error(error);
        }
 
        
    };

export const getStaticProps = async ({ params: { name } }) => {
    
    try {
        await connectDB();
        await SubCategory.find({});
        await Category.find({});

        const category = await Category.findOne({slug:name})
                                        .populate("sub_categories");

        const posts = await Blog.find()
                                .populate("categories")
                                .populate("sub_categories");

        const desired_posts = posts.filter((blog) =>{
            blog.categories.some((category) => 
                name.includes(category.slug)
            )
        })

        

    return {
        props: { category: JSON.parse(JSON.stringify(category)), posts: JSON.parse(JSON.stringify(desired_posts)) },
        revalidate: 60,
    };
    } catch (error) {
        
    }
};