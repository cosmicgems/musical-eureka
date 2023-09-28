import { Box, Button, Modal, Typography } from '@mui/material'
import { green, grey, red } from '@mui/material/colors'
import React, { useState } from 'react'
import Layout from '../../../../../components/Layout'
import CategoryModify from '../../../../../components/Blog Crud/CategoryModify'
import axios from 'axios'
import SubcategoryModify from '../../../../../components/Blog Crud/SubcategoryModify'



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



const IdentifiersModifyPage = () => {
  
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = (id:any) =>{ setId(id);setOpen(true)};
  const [id, setId] = useState<any>("");
  const handleClose = () => setOpen(false);
  const handleDelete = async (postId:any) => {
    console.log(postId);
    
    const deletedPost = await axios.delete(`/api/blog/post/delete/${postId}`, )
    handleClose()
    console.log("The post have been successfully deleted.", deletedPost);
  
  }

  return (
    <Box sx={{bgcolor: grey[100]}} className="">
      
      <Layout>
            <div className='flex flex-col sm:flex-row gap-12 py-3 px-12 '>

              <div className='md:w-3/5'>
                <div className='w-full text-center p-3'>
                  <Typography variant='h3' sx={{color: green[500]}} className='gradient-text-subcategories'>
                    Categories
                  </Typography>                
                </div>

                <div>
                  <CategoryModify/>
                </div>
              </div>

              <div className='md:w-2/5 '>
                <div className='w-full text-center p-3'>
                  <Typography variant='h3' sx={{color: green[500]}} className='gradient-text-subcategories'>
                    Subcategories
                  </Typography>                
                </div>

                <div className='overflow-y-auto h-[70vh] pr-3'>
                  <SubcategoryModify />
                </div>
              </div>


            </div>  

</Layout>

    </Box>
  )
}

export default IdentifiersModifyPage