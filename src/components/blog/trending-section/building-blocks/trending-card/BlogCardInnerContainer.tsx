import React from 'react'
import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import BlogCardImage from './BlogCardImage'
import BlogCardTitle from './BlogCardTitle'

import BlogCardActions from './BlogCardActions'
import BlogCardCreator from './BlogCardCreator'
import BlogCardExcerpt from './BlogCardExcerpt'




const BlogCardInnerContainer = ({
    blog, 
    handleNavigate,
    user
}) => {

    const {
        body,
        categories,
        click_count: clickCount,
        createdAt,
        excerpt,
        mdesc: desc,
        photo,
        postedBy,
        read_count: readCount,
        share_count: shareCount,
        slug,
        sub_categories,
        title,
        _id: id
    } = blog;

    const excerptTwo = body.substring(11, 150);
    const path = `/articles/post/${slug}`;

    return (

        <div
            style={
                {
                    borderRadius: '5px',
                    boxShadow: '5px 5px 5px #000',
                    backgroundImage: `url(${photo})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover"
                }
            }
            className=' md:min-h-[200px] z-20'
        >

            <Box 
                className="flex flex-col justify-between w-full md:w-[500px] gap-1   py-2 px-3 h-full"
                sx={
                    {
                        borderRadius: '5px', 
                        bgcolor: "rgba(33, 33, 33, 0.1)",
                    }
                }
            >

                <div className='basis-1/4'>

                    <BlogCardTitle 
                        title={title} 
                        handleNavigate={handleNavigate} 
                    />

                </div>




                <div className='basis-1/4'>

                    <BlogCardExcerpt
                        excerpt={excerpt}
                        excerptTwo={excerptTwo}
                    />

                </div>

                <div className='basis-1/4'>

                    <BlogCardActions 
                        clickCount={clickCount}
                        excerpt={excerpt}
                        excerptTwo={excerptTwo}
                        id={id}
                        path={path}
                        readCount={readCount}
                        shareCount={shareCount}
                        title={title}
                        user={user}
                    />

                </div>

            </Box>

        </div>

    )
}

export default BlogCardInnerContainer