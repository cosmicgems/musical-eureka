import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import Layout from '../../../../../components/Layout'
import connectDB from '../../../../../../lib/connectDB'
import Category from '../../../../../../lib/models/category'
import SubCategory from '../../../../../../lib/models/sub_category'
import User from '../../../../../../lib/models/user'
import Blog from '../../../../../../lib/models/blog'
import PostsContainer from '../../../../../components/Featured Post Manager/PostsContainer'
import Tag from '../../../../../../lib/models/tag'
import FeaturedContainer from '../../../../../components/Featured Post Manager/FeaturedContainer'



interface Author {
  _id: string;
  first_name: string;
  last_name: string;
  photo: string;
  username: string;
  email: string;
}

interface Blog {
  _id: string;
  title: string;
  categories: any[];
  sub_categories: any[];
  photo: string;
  body: string;
  excerpt: string;
  slug: string;
  mtitle: string;
  mdesc: string;
  createdAt: Date;
  updatedAt: Date;
  postedBy: Author;
  featured: boolean;
}



const FeaturedPostManagerPage = ({ initialBlogs, totalBlogCount, featuredBlogs}: { initialBlogs: Blog[]; totalBlogCount: number,  featuredBlogs: Blog[]; }) => {
  let maxFeatures = false;
  const data = {blogs:initialBlogs, maxFeatures}
  return (
    
    <Box sx={{bgcolor: grey[100]}} className="">

      <Layout>

        <div className='px-6 py-3'>

          <Typography variant='h2' sx={{}} className='gradient-text-subcategories text-center w-full'>
            Featured Post Manager
          </Typography>

          <div className='flex flex-col md:flex-row gap-12'>

            <div className='sm:w-3/5'>
              <PostsContainer data={data} />
            </div>

            <div className='md:w-2/5'>
              <FeaturedContainer featuredBlogs={featuredBlogs} />
            </div>

          </div>

          

        </div>

      </Layout>

    </Box>
  )
}

export async function getStaticProps() {
  try {        
      

      
      await connectDB() 
      let page = 1;
      let limit = 5;
      const pageValue = parseInt(Array.isArray(page) ? page[0] : page, 10) || 1;
      const limitValue = parseInt(Array.isArray(limit) ? limit[0] : limit, 10) || 5;

      const skip = (pageValue - 1) * limitValue;

      await Category.find({});
      await SubCategory.find({});
      await User.find({});
      await Tag.find({});
      const totalBlogCount = await Blog.countDocuments();
      const blogs = await Blog.find({})
          .populate("categories")
          .populate("sub_categories")
          .populate("postedBy")
          .populate("tags");

    

      const initialNotFeaturedBlogs = blogs.filter((blog) =>
        !blog.featured
      );

   
      const initialFeaturedBlogs = blogs.filter((blog) => 
        blog.featured
      );

      
      
          

      return {
          props: { initialBlogs: JSON.parse(JSON.stringify(initialNotFeaturedBlogs)), totalBlogCount, featuredBlogs: JSON.parse(JSON.stringify(initialFeaturedBlogs)) },
      };       
  } catch (error) {
      console.error('Error fetching data:', error);
      return {
          props: {
              initialBlogs: [], 
              featuredBlogs: [],
              totalBlogCount: null,
          },
      };
  }
}

export default FeaturedPostManagerPage