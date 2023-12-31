import React from 'react'
import FeaturedSectionContainer from './building-blocks/FeaturedSectionContainer'

const FeaturedSection = ({
    featuredPosts,
    user,
}) => {
    return (
        
        <FeaturedSectionContainer 
        featuredPosts={featuredPosts}
        user={user}
        />
    )
}

export default FeaturedSection