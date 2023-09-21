import { Box, Button, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import React, { useState } from 'react'
import Layout from '../../../components/Layout';
import Subscribe from '../../../components/Subscribe';
import CategoryCard from '../../../components/category/CategoryCard';
import { API, DOMAIN, APP_NAME } from "../../../../config";

const CategoriesPage = ({categories}) => {
  const [homeSearch, setHomeSearch] = useState<string>("");
  return (
    <Box className='' sx={{bgcolor: grey[100]}}>


        <Layout >
            <div className='min-h-screen sm:min-h-[80vh] flex flex-col justify-between items-center gap-6 pt-12 sm:pt-0'>
                <div className='w-full'>
                    <Subscribe/>
                </div>
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
                        <Typography variant='h3' sx={{fontSize: "2.25em"}} className='font-bold gradient-text-four'>
                            Categories
                        </Typography>
                    </div>
                </div>
                    <div className='flex gap-6 overflow-x-auto w-screen pb-6'>
                        {categories.map((c, i)=> {
                            if (i === 0 ) {
                                return (
                                    <Box key={`${i}: ${c._id}`} className='pl-3  flex flex-col gap-3 pb-6 pr-6 ' sx = {{background: 'linear-gradient(to right, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, 0) 100%)'}}>
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
                                    <Box key={`${i}: ${c._id}`} className='pl-3  flex flex-col gap-3 pb-6 pr-6 ' sx = {{background: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)'}}>
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
                                    <Box key={`${i}: ${c._id}`} className='pl-3  flex flex-col gap-3 pb-6 pr-6 '>
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
export const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/api/blog/category/get-all`);
      const categories = res.data.categories;
      return { categories };
    } catch (error) {
      console.error("Error fetching categories data:", error);
      return { categories: [] };
    }
  };


  export async function getStaticProps() {
    const { categories } = await fetchCategories();
  
    return {
      props: { categories },
    };
  }
  
export default CategoriesPage