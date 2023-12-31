import React, {useEffect, useRef, useState} from 'react';
import { FeaturedSection } from '@components/blog/featured-section';


interface Author {
    _id: string;
    first_name: string;
    last_name: string;
    photo: string;
    username: string;
    email: string;
}

interface Blog {
    _id: string;
    title: string;
    categories: any[];
    sub_categories: any[];
    photo: string;
    body: string;
    excerpt: string;
    slug: string;
    mtitle: string;
    mdesc: string;
    createdAt: Date;
    updatedAt: Date;
    postedBy: Author;
}

const FeaturedPosts = ({featuredPosts, user}) => {



    return (
        <FeaturedSection 
        featuredPosts={featuredPosts}
        user={user}
        />
    )
}

export default FeaturedPosts
