import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { useState } from 'react'
import FeaturedCard from './FeaturedCard'
import axios from 'axios'

const FeaturedContainer = ({featuredBlogs}) => {
    const [blogs, setBlogs] = useState<any>(featuredBlogs);

    const handleFeatureToggle = async() => {
        const featured = await axios.get("/api/blog/post/get-featured");
        console.log(featured.data.featured, "frontend Message");
        setBlogs(featured.data.featured)
        return featured.data.featured
      };
    

    return (
        <Box sx={{bgcolor: grey[900], borderRadius: '5px'}} className="p-3">

            <div className='p-3 flex flex-col gap-6'>


                <Typography variant='h3' sx={{}} className='gradient-text-four w-full text-center'>
                    Featured Post
                </Typography>

                {
                    blogs.map((b,i) => {
                        const data = {b, i}
                        return(
                            <div key={i} >
                                <FeaturedCard blog={data} onFeatureToggle={handleFeatureToggle}/>
                            </div>
                    )})
                }

            </div>

        </Box>
    )
}

export default FeaturedContainer