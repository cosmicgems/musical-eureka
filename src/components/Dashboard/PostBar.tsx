import { Box, CardMedia, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import { useRouter } from 'next/router'

const PostBar = ({post}) => {

  const router = useRouter();

  const handleClick = (slug:string) => {
    router.push(`/articles/post/${slug}`)
  }

  
  const excerpt = post.b.body.substring(60, 350);


  return (
    <Box sx={{bgcolor: post.i % 2 === 0 ? grey[900] : grey[700], borderRadius: '5px', boxShadow: '5px 5px '}}>

      <div onClick={()=> {handleClick(post.b.slug)}} className='flex gap-3'>

        <CardMedia 
        component="img"
        image={post.b.photo}
        alt=''
        sx={{objectFit: 'cover', borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px"}}
        className='sm:h-[22vh]'
        />

        <div className='flex flex-col gap-2 justify-center'>
          <Typography variant='h3' sx={{}} className='gradient-text-subcategories'>
            {post.b.title}
          </Typography>
          <Typography variant='body1' sx={{color:grey[50]}} className=''>
            {excerpt}
          </Typography>
        </div>

      </div>


    </Box>
  )
}

export default PostBar