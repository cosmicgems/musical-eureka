import { Box, Button, Typography } from '@mui/material'
import { amber, green, grey, red } from '@mui/material/colors'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import Modal from '@mui/material/Modal';


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


const ModifyPage = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1); 
  const [id, setId] = useState<any>("");
  const perPage = 10; 
  const handleOpen = (id:any) =>{ setId(id);setOpen(true)};
  const handleClose = () => setOpen(false);

  
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

  // const initBlogs = useCallback(async () => {
  //   try {
  //     const blogs = await axios.get("/api/blog/post/get-all");
  //     setPosts(blogs.data.blogs);
  //   } catch (error) {
  //     // Handle any errors here
  //     console.error("Error fetching blogs:", error);
  //   }
  // }, []);

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
  
  console.log(posts);
  

  return (
    <Box sx={{bgcolor: grey[200]}} className="min-h-screen">

        <div className='flex flex-col justify-center items-center gap-3'>

            <div className='w-full text-center p-3'>
                <Typography variant='h3' sx={{color: green[500]}} className='text-bold font-bold'>
                    Modify Post
                </Typography>
            </div>   

            <div className='flex flex-col gap-3 justify-center p-3 w-3/5'>

              {posts.map((p:any, i:number)=>{
                return (
              <Box key={p._id} sx={{bgcolor: i % 2 === 0 ? grey[600] : grey[800], borderRadius: '10px'}} className='flex flex-row gap-3 justify-between p-3'>

                <div>
                  <Typography variant='h3' className='font-bold' sx={{color: grey[50]}}>
                    {p.title}
                  </Typography>                  
                </div>

                <div className='flex items-center'>
                  <div className='flex flex-row gap-6 justify-center items-center'>
                    <Button variant='contained' size='large' sx={{bgcolor: amber[500], }} className=''>
                      Update
                    </Button>

                    <Button onClick={()=>handleOpen(p._id)} size='large' variant='contained' sx={{bgcolor: red[500]}}>Delete</Button>               
                  </div>



                </div>

              </Box>
                )
              })}
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

            <div className='mb-6'>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <Button variant='outlined' sx={{borderColor: green[500], borderWidth: '3px'}} onClick={handleLoadMore}>Load More</Button>
              )}
            </div>
            

        </div>


    </Box>
  )
}

export default ModifyPage