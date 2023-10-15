import React from 'react'
import ComingSoon from '../../../components/ComingSoon'
import connectDB from '../../../../lib/connectDB'
import User from '../../../../lib/models/user'

const ProfileHomePage = () => {
  return (
    <>

    </>
  )
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

  await connectDB();
  const user = await User.findOne({username})
                        .populate("favorite_posts");


}

export default ProfileHomePage