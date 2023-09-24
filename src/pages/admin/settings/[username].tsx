import React, { useState } from 'react'
import connectDB from '../../../../lib/connectDB'
import User from '../../../../lib/models/user'
import Layout from '../../../components/Layout';
import { Box, CardMedia, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import UserSettingsForm from '../../../components/User/UserSettingsForm';

const SettingsPage = ({user}) => {
  const [updatedUserData, setUpdatedUserData] = useState(null);

  const handleUserDataUpdate = (updatedData) => {
    
    setUpdatedUserData(updatedData);
    console.log(updatedUserData);
    
  };
  
  
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
