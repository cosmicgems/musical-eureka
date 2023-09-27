import React, { useEffect, useState } from 'react'
import { Box} from '@mui/material'
import { grey } from '@mui/material/colors'
import PostCard from "./PostCard"
import axios from 'axios'



const PostsContainer = ({data}) => {
    const [blogs, setBlogs] = useState<any>(data.blogs);

    const handleFeatureToggle = async() => {
        const featured = await axios.get("/api/blog/post/get-featured");
        console.log(featured.data.featured, "frontend Message");
        setBlogs(featured.data.featured)
        return featured.data.featured
      };
    
      
    useEffect(() => {
        // This function will run whenever the 'blogs' state changes
        console.log('Blogs have been updated:', blogs);
    }, [blogs]);
    
    return (
        <Box className="p-3" sx={{bgcolor: grey[900], borderRadius: "5px"}}>

            <div className='max-h-[50vh] overflow-y-auto pr-3'>

                {
                    blogs.map((blog, i) => {
                        const b = {blog, i, maxFeatures:data.maxFeatures}
                        return (
                            <div key={i} className='mb-2'>
                                <PostCard blogData={b} onFeatureToggle={handleFeatureToggle}/>
                            </div>
                        )
                    })
                }


            </div>

        </Box>
    )
}

export default PostsContainer