import React, { useState } from 'react'
import connectDB from '../../../../lib/connectDB'
import User from '../../../../lib/models/user'
import Layout from '../../../components/Layout';
import { Box, CardMedia, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import UserSettingsForm from '../../../components/User/UserSettingsForm';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Loading from '../../../components/Loading';



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


const SettingsPage = ({user}) => {
  const router = useRouter();
  const [updatedUserData, setUpdatedUserData] = useState(null);
  const [verified, setVerified] = useState<boolean>(null);

  const handleUserDataUpdate = (updatedData) => {
    
    setUpdatedUserData(updatedData);
    console.log(updatedUserData);
    
  };
  

  const {data:session, status} = useSession() as Session;
  const sessionCheck = async() => {
    if(session.user._id ) {
        setVerified(true);
        return true
    } else if (!session.user._id){
        setVerified(false)
        return false
    }
  }

  if(status === "loading" ) {
      return <Loading />
  }

  if(verified === null) {
      const authenticated = sessionCheck();
      if(!authenticated){
          router.push("auth/login")
      }
  }

  if(verified && session.user.role === 24){
    return (
      <Box sx={{bgcolor: grey[100]}}>
        <Layout>
          <div className='mt-12 pt-6 ' >
          
              <UserSettingsForm user={user} onUserDataUpdate={handleUserDataUpdate} />
        
            
          </div>
        </Layout>      
      </Box>


    )    
  }

  if(verified && session.user.role !== 24) {
    router.push(`/admin/dashboard/${session.user.username}`)
  } 


}

export default SettingsPage

export const getStaticPaths = async () => {
  await connectDB();
  const res = await User.find({}, 'username');
  const usernames = res.map((u) => u.username);

  const paths = usernames.map((username) => ({
    params: { username }
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { username } }) => {

  await connectDB();
  
  const user = await User.findOne({username});

  return {
    props: { user: JSON.parse(JSON.stringify(user))}
  }
}


SettingsPage.auth = true