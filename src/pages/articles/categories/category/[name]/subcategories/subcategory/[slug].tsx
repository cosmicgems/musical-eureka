import axios from 'axios';
import React, { useEffect, useRef, useState} from 'react'
import { API, DOMAIN, APP_NAME } from "../../../../../../../../config";
import connectDB from '../../../../../../../../lib/connectDB';
import SubCategory from '../../../../../../../../lib/models/sub_category';
import Category from '../../../../../../../../lib/models/category';
import User from '../../../../../../../../lib/models/user';
import Blog from '../../../../../../../../lib/models/blog';
import { Box, Button, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import Layout from '../../../../../../../components/Layout';
import SearchResults from '../../../../../../../components/Search Bar/SearchResults';
import SmallBlogCard from '../../../../../../../components/blog/SmallBlogCard';
import BlogPost from '../../../../../../../components/blog/BlogPost';
import { useSession } from 'next-auth/react';
import Loading from '../../../../../../../components/Loading';



interface Session {
  data:{
      user:{
          about: string;
          confirmed_account: boolean;
          createdAt: Date;
          email: string;
          first_name: string;
          last_name: string;
          password: string;
          photo: string;
          role: number;
          updatedAt: Date;
          username: string;
          verification_token: string;
          verification_token_expiration: string;
          _id: string;
          
      }      
  },
  status: string;

}

const SubcategorySlugPage = ({sub_category, posts}) => {
  const {data:session, status} = useSession() as Session;
  const [user, setUser] = useState<any>(null);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
      const scrollContainer = scrollContainerRef.current;
  
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

  if(status === "loading"){
      return <Loading/>
  }

  if(status === "authenticated"){
      if(user === null){
      const findUser = async() => {
          const res = await axios.get(`/api/user-actions/find-user?id=${session.user._id}`);
          setUser(res.data.user);
      }
      findUser();            
      }

  }

  
  
    return (
        <Box sx={{bgcolor: grey[100]}} className="">

          <Layout>

            
          <div className='min-h-screen sm:min-h-[80vh] flex flex-col justify-between items-center gap-12 pt-12 sm:pt-0 max-w-screen'>
                    <div className='flex flex-col justify-center items-center sm:w-3/4  px-6  mb-6'>
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
        <div className='w-full'>
            <Typography variant='h2' className='text-center gradient-text-subcategories mb-6' sx={{}}>
                {sub_category.name} Posts
            </Typography>
        </div>
        
          <div className='w-[99vw]' >
            <div  className='flex gap-6 overflow-x-auto  pb-6 w-[100%] scrollable-container'>
                
                {posts.map((b, i)=> {
                    if(i === 0) {
                        return (
                            <Box key={`${i}: ${b._id}`} className='pl-3  flex flex-col gap-3 pb-6 pr-6 scrollable-item' sx = {{background: 'linear-gradient(to right, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, 0) 100%)'}}>
                            <div className='flex justify-center items-center'>
                                <Button href={`/articles/categories/category/${b.categories[0].slug}`}>
                                    <Typography variant='h2' className='font-bold gradient-text-category' sx={{fontSize: '1.75rem'}}>
                                        {b.categories[0].name}
                                    </Typography>                                            
                                </Button>

                            </div>
                            <BlogPost blog={b} user={user} />
                        </Box>
                        )
                    } else if (i === posts.length -1){
                        return (
                            <Box key={`${i}: ${b._id}`} className='pl-6 pr-6 flex flex-col gap-3 scrollable-item' sx = {{background: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)'}}>
                            <div   className='flex justify-center items-center'>
                                <Button href={`/articles/categories/category/${b.categories[0].slug}`}>
                                    <Typography variant='h2' className='font-bold gradient-text-three' sx={{fontSize: '1.75rem'}}>
                                        {b.categories[0].name}
                                    </Typography>                                            
                                </Button>

                            </div>
                            <BlogPost blog={b} user={user} />
                        </Box>
                        )
                    } else {
                        return (
                            <Box key={`${i}: ${b._id}`} className='pl-3  flex flex-col gap-3 scrollable-item'>
                                <div className='flex justify-center items-center'>
                                    <Button href={`/articles/categories/category/${b.categories[0].slug}`}>
                                        <Typography variant='h2' className='font-bold gradient-text-category' sx={{fontSize: '1.75rem'}}>
                                            {b.categories[0].name}
                                        </Typography>                                            
                                    </Button>

                                </div>
                                <BlogPost blog={b} user={user} />
                            </Box>
                        )                                
                    }

                })}
            </div> 
          </div>

    </div>
                    
            
                </div>

          </Layout>

        </Box>
    )
}

export default SubcategorySlugPage



export const getStaticPaths = async () => {
  try {
    await connectDB();

    // Fetch categories and their sub-categories in parallel
    const [ subcategories, categories,] = await Promise.all([
      SubCategory.find({}, 'slug'),
      Category.find({}).populate("sub_categories"),
    ]);
    console.log(categories);
    
    const paths = [];

    categories.forEach((category) => {
      const subcategoriesData = category.sub_categories.map((subcategory) => ({
        name: category.slug,
        slug: subcategory.slug,
      }));

      subcategoriesData.forEach((p) => {
        paths.push({ params: { name: p.name, slug: p.slug } });
      });
    });

    console.log(paths);
    
    
    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error(error);
  }
};

export const getStaticProps = async ({ params: { slug } }) => {
  // Fetch data for the given slug during build time
  try {
    await connectDB();
    await Category.find({});
    await User.find({});
    await SubCategory.find({});
    

    const sub_category = await SubCategory.findOne({slug});

    const blogs = await Blog.find({})
                            .populate("categories")
                            .populate("sub_categories")
                            .populate("postedBy")

    const filteredBlogs = blogs.filter((blog) =>
      blog.sub_categories.some((sc) => 
        slug.includes(sc.slug)
      )
    )

    
    console.log(sub_category);
    
    return {
      props: {sub_category: JSON.parse(JSON.stringify(sub_category)), posts: JSON.parse(JSON.stringify(filteredBlogs))},
    };
  } catch (error) {
    console.error(`Error fetching data for slug ${slug}:`, error);
    return {
      props: {sub_category: null}, 
    };
  }
};


