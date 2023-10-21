import theme from '../../../styles/theme/lightThemeOptions'
import { CardMedia, Typography } from '@mui/material'
import React from 'react'

const BlogPost = () => {
  return (
    <div className='flex flex-col gap-3 justify-center items-center text-center' style={{padding: theme.spacing(3)}}>

      <div>
        <CardMedia 
        component='img'
        src='https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        sx={{}}
        className=''
        alt='blog post image'
        />
      </div>

      <div>
        <Typography variant='h6' sx={{}} className=''>
          Blog Post Name Place Holder 
        </Typography>
      </div>

    </div>
  )
}

export default BlogPost