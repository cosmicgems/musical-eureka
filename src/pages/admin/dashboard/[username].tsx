import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Layout } from '@components/big-three-components';
import connectDB from '../../../../lib/connectDB'
import User from '../../../../lib/models/user'
import { grey } from '@mui/material/colors'
import AdminCard from '../../../components/Dashboard/AdminCard'
import Category from '../../../../lib/models/category'
import SubCategory from '../../../../lib/models/sub_category'
import Blog from '../../../../lib/models/blog'
import PostBar from '../../../components/Dashboard/PostBar'
import QuickControls from '../../../components/Dashboard/QuickControls'
import { useSession } from 'next-auth/react'
import Loading from '../../../components/Loading'
import { useRouter } from 'next/router'

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

const Dashboard = (props) => {
    const [verified, setVerified] = useState<boolean>(null);
    const router = useRouter();
    const {data: user, posts} = props;
    
    const {data:session, status} = useSession() as Session;

    const sessionCheck = async() => {
        if(user._id === session.user._id ) {
            setVerified(true);
            return true
        } else if (user._id !== session.user._id){
            setVerified(false)
            return false
        }
    }

    if(status === "loading") {
        return <Loading />
    }
    
    if(verified === null) {
        const authenticated = sessionCheck();
        if(!authenticated){
            router.push("auth/login")
        }
    }


    
    if (verified) {
        return (
            <Box sx={{bgcolor: grey[100]}}>

                <Layout>

                    <div className='min-h-[85vh] flex flex-col gap-6  '>

                        <Typography variant='h3' sx={{}} className='gradient-text-subcategories w-full text-center mt-24'>
                            {user.username.toUpperCase()} Dashboard
                        </Typography>

                        <div className='flex flex-col sm:flex-row justify-between'>

                            <div className='sm:w-1/3 p-3' >
                                <AdminCard user={user} />
                            </div>

                            <div className='sm:w-4/6 p-3'>
                                <QuickControls />
                            </div>

                        </div>

                        <div className='p-3'>
                            
                            <Box sx={{bgcolor: grey[900], borderRadius: "5px"}} className="sm:w-4/5 py-3 px-2 ">
                                <div className='overflow-y-auto overflow-x-hidden flex flex-col gap-2 h-[65vh] sm:h-[35vh] pr-3'>
                                    {posts.map((b, i) => {
                                        const post = {b,i}
                                        return (
                                            <div key={b._id}>
                                                <PostBar post={post} />
                                            </div>
                                        )

                                    })}
                                </div>                            
                            </Box>


                        </div>

                    </div>

                </Layout>

            </Box>
        )        
    }

}

export default Dashboard

export const getStaticPaths = async () => {

    await connectDB();
    const response = await User.find({}, "username");
    const usernames = response.map((r) => r.username);

    const paths = usernames.map((username) => ({
        params: { username },
    }));

    return {
        paths,
        fallback: 'blocking',
    };
};

export const getStaticProps = async ({ params: { username } }) => {

    await connectDB();
    await User.find();

    await Category.find();
    await SubCategory.find();


    const user = await User.findOne({username}).then((data) => JSON.parse(JSON.stringify(data)) );

    const userId = user._id;

    const response = await Blog.find({})
                            .populate("categories")
                            .populate("sub_categories")
                            .populate("postedBy")
                            .then((data) => JSON.parse(JSON.stringify(data)))

                            

    const blogs = response.filter((blog) =>
        blog.postedBy?._id === userId
    );
    
    


    return {
        props: {data: user,  posts: blogs}
    };
};

Dashboard.auth =true