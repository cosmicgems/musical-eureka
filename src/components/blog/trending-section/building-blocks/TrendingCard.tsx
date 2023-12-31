import React from 'react'
import { BlogCardInnerContainer } from './trending-card'
import axios from 'axios';
import { useRouter } from 'next/router';

const TrendingCard = ({
    blog,
    user 
}) => {

    const router = useRouter();

    const handleNavigate = async(e:any) => {
        e.preventDefault();
        const read = await axios.put(`/api/blog/post/update/page-visits?id=${blog._id}`);
        console.log(read);
        
        router.push(`/articles/post/${blog.slug}`)
    };

    return (
        <BlogCardInnerContainer 
        blog={blog}
        handleNavigate={handleNavigate}
        user={user}
        />
    )
}

export default TrendingCard