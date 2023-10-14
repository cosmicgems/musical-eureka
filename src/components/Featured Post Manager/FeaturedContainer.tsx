import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import FeaturedCard from './FeaturedCard'
import axios from 'axios'
import FeaturedCardMobile from './FeaturedCardMobile'

const FeaturedContainer = ({featuredBlogs, onUpdate, handleUpdate}) => {
    const [blogs, setBlogs] = useState<any>(featuredBlogs);

    const handleFeatureToggle = async() => {
        onUpdate();
    };


    useEffect(() => {
        // This function will run whenever the 'blogs' state changes
        console.log('Blogs have been updated:', featuredBlogs);
        setBlogs(featuredBlogs);
    }, [ featuredBlogs ]);   

    return (
        <Box sx={{bgcolor: grey[900], borderRadius: '5px'}} className="p-3">

            <div className='p-3 flex flex-col gap-6'>


                <Typography variant='h3' sx={{}} className='gradient-text-four w-full text-center'>
                    Featured Post
                </Typography>
                <div className='max-h-[33vh] overflow-y-auto overflow-x-hidden pr-3 gap-3 flex flex-col '>
                {
                    blogs?.length === 0 ? 
                        <div >
                            <Typography variant="h3" className='gradient-text-category' sx={{}}>
                                No Posts are Featured
                            </Typography>
                        </div>
                    :
                    <>
                        {
                            blogs.map((b,i) => {
                                const data = {b, i}

                                return(

                                    <div key={i} >
                                        <div className='hidden sm:block'>
                                            <FeaturedCard blog={data} onFeatureToggle={handleFeatureToggle}/>
                                        </div>
                                        <div className='sm:hidden'>
                                            <FeaturedCardMobile blog={data} onFeatureToggle={handleFeatureToggle} />
                                        </div>
                                    </div>
                            )})
                        }                    
                    </>
                }
                </div>


            </div>

        </Box>
    )
}

export default FeaturedContainer