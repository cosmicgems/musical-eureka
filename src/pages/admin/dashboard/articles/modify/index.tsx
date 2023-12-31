import { Box, Button, Typography } from '@mui/material'
import { amber, green, grey, red } from '@mui/material/colors'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/router';
import CategoryModify from '../../../../../components/Blog Crud/CategoryModify';
import { Layout } from '@components/big-three-components';
import { useSession } from 'next-auth/react';
import Loading from '../../../../../components/Loading';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


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


const ModifyPage = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1); 
  const [id, setId] = useState<any>("");
  const [verified, setVerified] = useState<boolean>(null);

  const perPage = 10; 
  const handleOpen = (id:any) =>{ setId(id);setOpen(true)};
  const handleClose = () => setOpen(false);

  const router = useRouter();

  
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/blog/post/get-all?page=${page}&perPage=${perPage}`);
      const newPosts = response.data.blogs;
      setPosts([...posts, ...newPosts]);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  }, [page, posts]);

 
  useEffect(()=>{
    fetchPosts();
  },[])

  const handleLoadMore = () => {
    fetchPosts();
  };

  const handleDelete = async (postId:any) => {
    console.log(postId);
    
    const deletedPost = await axios.delete(`/api/blog/post/delete/${postId}`, )
    handleClose()
    console.log("The post have been successfully deleted.", deletedPost);
    
  }
  
  const handleUpdate = (e:any, slug:any) => {
    e.preventDefault()
    router.push(`/admin/dashboard/articles/modify/${slug}`)
  }
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
          router.push("/admin/unauthorized")
      }
  }

  if (verified) {
    return (
      <Box sx={{bgcolor: grey[100]}} className="min-h-screen">


        <Layout>

          <div className='flex lg:flex-row flex-col justify-center  gap-3 mt-20 sm:mt-0'>


              <div className='flex flex-col gap-3  p-3 sm:w-3/5'>

                <div className='w-full text-center p-3'>
                    <Typography variant='h3' sx={{}} className='gradient-text-subcategories'>
                        Modify Post
                    </Typography>
                </div>   

                {posts.map((p:any, i:number)=>{
                  return (
                <Box key={`${p._id} page`} sx={{bgcolor: i % 2 === 0 ? grey[900] : grey[700], borderRadius: '10px'}} className='flex flex-row gap-3 justify-between p-3'>

                  <div className='w-3/5'>
                    <Typography variant='h3' className='gradient-text-two truncate-title-modify ' sx={{}}>
                      {p.title}
                    </Typography>                  
                  </div>

                  <div className='flex items-center '>
                    <div className='flex flex-row gap-6 justify-center items-center'>
                      <Button onClick={(e)=>handleUpdate(e, p.slug)} variant='contained' size='large' sx={{color:grey[900] }} className='gradient-button-yellow'>
                        Update
                      </Button>

                      <Button onClick={()=>handleOpen(p._id)} size='large' variant='contained' className='gradient-button-red' sx={{border: "none"}}>Delete</Button>               
                    </div>



                  </div>

                </Box>
                  )
                })}
              <div className='mb-6 text-center'>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <Button variant='outlined' className='' sx={{borderColor: green[500], borderWidth: '3px'}} onClick={handleLoadMore}>Load More</Button>
                )}
              </div>
              </div>


                      <Modal
                      sx={{}}
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box className="flex flex-col gap-2 text-center" sx={style}>
                        <Typography id="modal-modal-title" variant="h6" >
                          Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description mb-2" >
                          Are you sure you would like to delete this post? This action is <span className='font-bold'>irreversible</span> .
                        </Typography>
                        <Typography variant='body2' sx={{color: grey[500]}} className='font-bold'>
                          Click outside this alert to cancel.
                        </Typography>
                        <div className='flex flex-row gap-3 justify-center items-center'>
                          <Button variant='contained' id={id} onClick={()=>handleDelete(id)} sx={{bgcolor: red[500]}} className=''>
                            Delete
                          </Button>
                          <Button onClick={handleClose} variant='contained' sx={{bgcolor: grey[700]}} className=''>
                            Cancel
                          </Button>   

                        </div>

                      </Box>
                    </Modal>     

              

          </div>

        </Layout>




      </Box>
    )    
  }

  if(verified && session.user.role !== 24) {
    router.push(`/admin/dashboard/${session.user.username}`)
  }
  


}

export default ModifyPage

ModifyPage.superAuth = true;