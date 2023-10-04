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
    <Box sx={{bgcolor: post.i % 2 === 0 ? grey[100] : grey[300], borderRadius: '5px',}}>

      <div onClick={()=> {handleClick(post.b.slug)}} className='flex gap-3 '>

        <CardMedia 
        component="img"
        image={post.b.photo ? post.b.photo : "https://images.pexels.com/photos/3246665/pexels-photo-3246665.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
        alt=''
        sx={{objectFit: 'cover', borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px"}}
        className='w-1/5 sm:h-[22vh]'
        />

        <div className='flex flex-col gap-2 justify-center p-2 '>
          <Typography variant='h3' sx={{fontSize:{xs:"1.25em", md:"2rem"}}} className='gradient-text-subcategories'>
            {post.b.title}
          </Typography>
          <Typography variant='body1' sx={{color:grey[900], wordWrap:"break-word"}} className='truncate-text w-[99%] '>
                    {
                        post.b.excerpt ?
                        <>
                        {post.b.excerpt}
                        </>
                        
                        :
                        <>
                        {excerpt} 
                        </>
                    }
          </Typography>
        </div>

      </div>


    </Box>
  )
}

export default PostBar