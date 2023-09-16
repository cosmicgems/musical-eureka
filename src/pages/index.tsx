import React, { useState } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic';
import { useStateContext } from '../../Context/StateContext';
import { Box, Button, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import BlogPost from '../components/blog/BlogPost';
import { GetStaticProps } from 'next';
import Subscribe from '../components/Subscribe';

const Layout = dynamic(() => import('../components/Layout'));


interface Blog {
    _id: string;
    title: string;
    categories: any[];
    sub_categories: any[];
    photo: string;
    body: string;
    slug: string;
    mtitle: string;
    mdesc: string;
    createdAt: Date;
    updatedAt: Date;
}

interface ApiResponse {
    message: string;
    blogs: Blog[];
}


const HomePage = ({ blogs }: { blogs: Blog[] }) => {
    // console.log(blogs);
    
    const {pageName, pageSlug, pathSegment, showCart, setShowCart, totalQuantities, subcategories } = useStateContext();
    const [homeSearch, setHomeSearch] = useState<string>("")
    const [subscriber, setSubscriber] = useState<string>("")


  return (
    <Box className='' sx={{bgcolor: grey[300]}}>


        <Layout >
            <div className='min-h-screen sm:min-h-[80vh] flex flex-col justify-between items-center gap-6 pt-12 sm:pt-0'>
                <div className='w-full'>
                    <Subscribe/>
                </div>
                <div className='flex flex-col justify-center items-center sm:w-3/4  px-6 sm:gap-6'>
                    <div>
                        <Typography variant='h1' className=' gradient-text text-center' sx={{color: grey[50], fontSize: {xs:"5rem"}}}>
                            Pearl Box
                        </Typography>
                    </div>
                    <div className='w-full flex gap-0'>
                        <TextField fullWidth variant='outlined' sx={{bgcolor:grey[50], borderTopLeftRadius: '5px', borderBottomLeftRadius: "5px", borderTopRightRadius: "0px", borderBottomRightRadius:"0px"}} label="Search for pearls..." className='' value={homeSearch} onChange={(e)=> {setHomeSearch(e.target.value)}} />
                        <Button variant='contained' sx={{borderTopLeftRadius:0, borderBottomLeftRadius:0,}}>
                            Search
                        </Button>
                    </div>
                </div>
                    <div className='flex gap-6 overflow-x-auto w-screen pb-6'>
                        {blogs.map((b, i)=> {
                            return (
                                <div key={`${i}: ${b._id}`} className='pl-3  flex flex-col gap-3'>
                                    <div className='flex justify-center items-center'>
                                        <Button href={`/categories/category/${b.categories[0].slug}`}>
                                            <Typography variant='h2' className='font-bold' sx={{fontSize: '1.75rem'}}>
                                                {b.categories[0].name}
                                            </Typography>                                            
                                        </Button>

                                    </div>
                                    <BlogPost blog={b} />
                                </div>
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
        console.log("trying");
        
        const res = await axios.get('http://localhost:3000/api/blog/post/get-all-home');
        const blogs = res.data.blogs

        return {
                props: {blogs}
        };
    } catch (error) {
        console.log("Error fetching data:", error);
        return {
            props: {
                blogs: [],
            },
        };
    }
}

export default HomePage