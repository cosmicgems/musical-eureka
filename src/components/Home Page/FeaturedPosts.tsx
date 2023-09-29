import React, {useRef, useState} from 'react';
import { Box, Button, Typography } from '@mui/material';
import BlogPost from '../blog/BlogPost';


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
}

const FeaturedPosts = ({featuredPosts}) => {
    const featuredTargetRef = useRef();
    const [loading, setLoading] = useState<boolean>(false);
    return (
    <div>
            <div className='w-full'>
            <Typography variant='h3' sx={{}} className='text-center gradient-text-subcategories'>
                Featured
            </Typography>
            </div>
            <div  className='flex gap-6 overflow-x-auto  pb-6 w-[100%] '>
                
                {featuredPosts.map((b, i)=> {
                    if(i === 0) {
                        return (
                            <Box key={`${i}: ${b._id}`} className='pl-3  flex flex-col gap-3 pb-6 pr-6 ' sx = {{background: 'linear-gradient(to right, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, 0) 100%)'}}>
                            <div className='flex justify-center items-center py-3'>
                                <Button href={`/categories/category/${b.categories[0].slug}`}>
                                    <Typography variant='h2' className='gradient-text-category' sx={{fontSize: '2rem'}}>
                                        {b.categories[0].name}
                                    </Typography>                                            
                                </Button>

                            </div>
                            <BlogPost  blog={b} />
                            </Box>
                        )
                    } else if (i === featuredPosts.length -1){
                        return (
                            <Box key={`${i}: ${b._id}`} className='pl-6 pr-6 flex flex-col gap-3' sx = {{background: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)'}}>
                            <div  ref={featuredTargetRef} className='flex justify-center items-center py-3'>
                                <Button href={`/categories/category/${b.categories[0].slug}`}>
                                    <Typography variant='h2' className='font-bold gradient-text-three' sx={{fontSize: '1.75rem'}}>
                                        {b.categories[0].name}
                                    </Typography>                                            
                                </Button>

                            </div>
                            <BlogPost blog={b} />
                            <div className=''  >
                                {loading && <div>Loading more blogs...</div>}
                            </div> 
                        </Box>
                        )
                    } else {
                        return (
                            <Box key={`${i}: ${b._id}`} className='pl-3  flex flex-col gap-3'>
                                <div className='flex justify-center items-center py-3'>
                                    <Button href={`/categories/category/${b.categories[0].slug}`}>
                                        <Typography variant='h2' className='font-bold gradient-text-category' sx={{fontSize: '1.75rem'}}>
                                            {b.categories[0].name}
                                        </Typography>                                            
                                    </Button>

                                </div>
                                <BlogPost blog={b} />
                            </Box>
                        )                                
                    }

                })}
            </div>
            
    </div>
  )
}

export default FeaturedPosts