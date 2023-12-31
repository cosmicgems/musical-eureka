import React from 'react'
import { TrendingSectionContainer } from './building-blocks'

const TrendingSection = ({
    totalBlogCount,
    blogs,
    user,
}) => {
    return (
        <TrendingSectionContainer
        blogs={blogs}
        user={user}
        totalBlogCount={totalBlogCount}
        />
    )
}

export default TrendingSection