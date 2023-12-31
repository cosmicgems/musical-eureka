import React from 'react'
import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import FeaturedCardImage from './FeaturedCardImage'
import FeaturedCardTitle from './FeaturedCardTitle'
import FeaturedCardCreator from './FeaturedCardCreator'
import FeaturedCardIdentifiers from './FeaturedCardIdentifiers'
import FeaturedCardExcerpt from './FeaturedCardExcerpt'
import FeaturedCardActions from './FeaturedCardActions'


const FeaturedCardInnerContainer = ({
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
            className='min-h-[475px] md:min-h-[500px]'
        >

            <Box 
                className="flex flex-col w-[355px] md:w-[350px]  min-h-[475px] md:min-h-[500px] py-2 px-3 gap-3"
                sx={
                    {
                        borderRadius: '5px', 
                        bgcolor: "rgba(33, 33, 33, 0.3)",
                    }
                }
            >

                <div className='basis-1/5'>

                    <div className="card-glass">
                        <FeaturedCardTitle 
                            title={title} 
                            handleNavigate={handleNavigate} 
                        />                        
                    </div>

                </div>

                <div className='basis-1/5'>

                    <div className='card-glass'>
                        <FeaturedCardCreator
                            postedBy={postedBy}
                            createdAt={createdAt}
                        />                        
                    </div>


                </div>

                <div className='basis-1/5'>

                    <div className="card-glass">
                        <FeaturedCardIdentifiers 
                            subcategories={sub_categories} 
                            categories={categories}
                        />                        
                    </div>

                </div>

                <div className='basis-1/5'>
                    
                    <div className="card-glass">
                        <FeaturedCardExcerpt
                            excerpt={excerpt}
                            excerptTwo={excerptTwo}
                        />                        
                    </div>

                </div>

                <div className='basis-1/5'>

                    <div className="card-glass-actions">
                        <FeaturedCardActions 
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

                </div>

            </Box>

        </div>

    )
}

export default FeaturedCardInnerContainer