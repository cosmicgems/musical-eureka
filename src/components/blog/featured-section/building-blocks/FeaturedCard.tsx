import React from 'react'
import FeaturedCardInnerContainer from './featured-card/FeaturedCardInnerContainer'
import axios from 'axios';
import { useRouter } from 'next/router';

const FeaturedCard = ({blog, user }) => {

    const router = useRouter();
    
    const handleNavigate = async(e:any) => {
        e.preventDefault();
        const read = await axios.put(`/api/blog/post/update/page-visits?id=${blog._id}`);
        console.log(read);
        
        router.push(`/articles/post/${blog.slug}`)
    };

    return (
        <FeaturedCardInnerContainer 
            handleNavigate={handleNavigate} 
            blog={blog} 
            user={user}
        />
    )
}

export default FeaturedCard