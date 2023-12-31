import React, { useEffect, useState } from 'react'
import { Box, Typography} from '@mui/material'
import { grey } from '@mui/material/colors'
import PostCard from "./PostCard"
import axios from 'axios'
import PostCardMobile from './PostCardMobile'



const PostsContainer = ({data, onUpdate}) => {
    const [blogs, setBlogs] = useState<any>(data.blogs);

    const handleFeatureToggle = async() => {
        onUpdate();
    };
    

    useEffect(() => {
        // This function will run whenever the 'blogs' state changes
        console.log('Blogs have been updated:',  data.blogs);
        setBlogs(data.blogs)
    }, [ data.blogs ]);
    
    return (
        <Box className="p-3" sx={{bgcolor: grey[900], borderRadius: "5px"}}>


                <Typography variant='h3' sx={{}} className='gradient-text-two w-full text-center p-3'>
                    All Posts
                </Typography>
            <div className='max-h-[50vh] overflow-y-auto pr-3 overflow-x-hidden'>

                {
                    blogs?.length === 0 ?
                        <div >
                            <Typography variant="h3" className='gradient-text-category w-full text-center' sx={{}}>
                                All Posts are Featured
                            </Typography>
                        </div>
                    :
                    <>
                        {
                            blogs.map((blog, i) => {
                                const b = {blog, i, maxFeatures:data.maxFeatures}
                                
                                return (
                                    <div key={i} className='mb-2'>
                                        <div className='hidden sm:block'>
                                            <PostCard blogData={b} onFeatureToggle={handleFeatureToggle}/>
                                        </div>
                                        <div className='sm:hidden'>
                                            <PostCardMobile blogData={b} onFeatureToggle={handleFeatureToggle}/>
                                        </div>
                                        
                                    </div>
                                )
                            })
                        }                    
                    </>

                }




            </div>

        </Box>
    )
}

export default PostsContainer