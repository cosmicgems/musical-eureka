import React, { useState } from 'react'
import ComingSoon from '../../../components/ComingSoon'
import connectDB from '../../../../lib/connectDB'
import User from '../../../../lib/models/user'
import { useSession } from 'next-auth/react'
import Layout from '../../../components/Layout'
import Loading from '../../../components/Loading'
import MyProfile from '../../../components/Profile Page/MyProfile'
import OtherProfile from '../../../components/Profile Page/OtherProfile'


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


const ProfileHomePage = ({user}) => {

  const {data:session, status} = useSession() as Session;

  const [myProfile, setMyProfile] = useState<boolean>(null);
  const [otherProfile, setOtherProfile] = useState<boolean>(null);
  const [pageCheck, setPageCheck] = useState<boolean>(null);

  if(status === "loading"){
    return <>
      <Layout>
        <Loading />
      </Layout>
    </>
  }

  const checkUser = async() => {
    if (user._id === session.user._id ){
      setMyProfile(true);
      setOtherProfile(false);
    } else {
      setMyProfile(false);
      setOtherProfile(true);
    }
    setPageCheck(true);
  }

  if(pageCheck === null){
    checkUser();
  }

  if(myProfile){
    return <MyProfile user={user} />
  }

  if(otherProfile){
    return <OtherProfile />
  }
}

export const getStaticPaths = async () => {
  
  await connectDB();

  const res = await User.find({}, 'username');
  const usernames = res.map((u)=> u.username);

  const paths = usernames.map((username) => ({
    params: { username },
  }))

  return {
    paths,
    fallback: "blocking"
  };

};


export const getStaticProps = async ({ params: {username} }) => {

  try {
    await connectDB();
    const user = await User.findOne({username})
                          .populate("favorite_posts"); 

    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
      },
    };
  } catch (error) {
    return {
      props: {
        user: null,
      },
    };
  }




}

export default ProfileHomePage