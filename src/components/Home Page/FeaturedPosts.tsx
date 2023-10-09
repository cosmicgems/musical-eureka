import React, {useEffect, useRef, useState} from 'react';
import { Box, Button, Typography } from '@mui/material';
import BlogPost from '../blog/BlogPost';
import { useSession } from 'next-auth/react';


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

interface Session {
    data:{
        user:{
            about: string;
            confirmed_account: boolean;
            createdAt: Date;
            email: string;
            first_name: string;
            last_name: string;
            password: string;
            photo: string;
            role: number;
            updatedAt: Date;
            username: string;
            verification_token: string;
            verification_token_expiration: string;
            _id: string;
            
        }      
    },
    status: string;

}

const FeaturedPosts = ({featuredPosts, user}) => {

    const {data:session, status} = useSession() as Session;

    
    
    const featuredTargetRef = useRef();
    const [loading, setLoading] = useState<boolean>(false);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
    
        // Add an event listener to handle scroll snap on scroll end
        const handleScroll = () => {
        const scrollLeft = scrollContainer.scrollLeft;
        const containerWidth = scrollContainer.clientWidth;
        const featuredCards = scrollContainer.querySelectorAll('.scrollable-item');
    
        let nearestCard = null;
        let minDistance = Infinity;
    
        // Find the nearest project card based on scroll position
        featuredCards.forEach((card) => {
            const cardRect = card.getBoundingClientRect();
            const distance = Math.abs(cardRect.left - scrollLeft);
    
            if (distance < minDistance) {
            minDistance = distance;
            nearestCard = card;
            }
        });
    
        // Snap to the nearest project card
        if (nearestCard) {
            scrollContainer.scrollTo({
            left: nearestCard.offsetLeft,
            behavior: 'smooth',
            });
        }
        };
    
        if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleScroll);
        }
    
        return () => {
        if (scrollContainer) {
            scrollContainer.removeEventListener('scroll', handleScroll);
        }
        };
    
    }, []);

    if (status === "loading"){
        return <h3 >Loading...</h3>
    } else {
                    
        return (
        <div>
                <div className='w-full'>
                <Typography variant='h3' sx={{}} className='text-center gradient-text-subcategories'>
                    Featured
                </Typography>
                </div>
                <div  className='flex gap-6 overflow-x-auto  pb-6 w-[100%] scrollable-container'>
                    
                    {featuredPosts.map((b, i)=> {
                        if(i === 0) {
                            return (
                                <Box key={`${i}: ${b._id}`} className='pl-3  flex flex-col gap-3 pb-6 pr-6 scrollable-item' sx = {{background: 'linear-gradient(to right, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, 0) 100%)'}}>
                                <div className='flex justify-center items-center py-3'>
                                    <Button href={`/articles/categories/category/${b.categories[0].slug}`}>
                                        <Typography variant='h2' className='gradient-text-category' sx={{fontSize: '2rem'}}>
                                            {b.categories[0].name}
                                        </Typography>                                            
                                    </Button>

                                </div>
                                <BlogPost  blog={b} user={user}/>
                                </Box>
                            )
                        } else if (i === featuredPosts.length -1){
                            return (
                                <Box key={`${i}: ${b._id}`} className='pl-6 pr-6 flex flex-col gap-3 scrollable-item' sx = {{background: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)'}}>
                                <div  ref={featuredTargetRef} className='flex justify-center items-center py-3'>
                                    <Button href={`/articles/categories/category/${b.categories[0].slug}`}>
                                        <Typography variant='h2' className='font-bold gradient-text-three' sx={{fontSize: '1.75rem'}}>
                                            {b.categories[0].name}
                                        </Typography>                                            
                                    </Button>

                                </div>
                                <BlogPost blog={b} user={user} />
                                <div className=''  >
                                    {loading && <div>Loading more blogs...</div>}
                                </div> 
                            </Box>
                            )
                        } else {
                            return (
                                <Box key={`${i}: ${b._id}`} className='pl-3  flex flex-col gap-3 scrollable-item'>
                                    <div className='flex justify-center items-center py-3'>
                                        <Button href={`/articles/categories/category/${b.categories[0].slug}`}>
                                            <Typography variant='h2' className='font-bold gradient-text-category' sx={{fontSize: '1.75rem'}}>
                                                {b.categories[0].name}
                                            </Typography>                                            
                                        </Button>

                                    </div>
                                    <BlogPost blog={b} user={user} />
                                </Box>
                            )                                
                        }

                    })}
                </div>
                
        </div>
    )        
    }

}

export default FeaturedPosts