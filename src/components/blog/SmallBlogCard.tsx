import { Box, Button, CardMedia, Typography } from '@mui/material'
import { grey } from '@mui/material/colors';
import React from 'react'


interface BlogPostProps {
    blog: {
        _id: string;
        title: string;
        categories: any[];
        sub_categories: any[];
        photo: string;
        body: string;
        slug: string;
        mtitle: string;
        mdesc: string;
        createdAt: Date;
        updatedAt: Date;
    };
}



const SmallBlogCard: React.FC<BlogPostProps> = ( {blog} ) => {

    const {_id: id, title, categories, sub_categories, photo, body, slug, createdAt} = blog;

    console.log(photo);
    

    const excerpt = body.substring(11, 150);

  return (
    <Box className="w-[30vw]" sx={{bgcolor:grey[700], borderRadius:"5px", borderTopLeftRadius:"90px", borderBottomLeftRadius: '90px'}}>
        <div className='flex flex-row gap-3'>

            <CardMedia 
            component='img'
            image={photo  ? photo : "https://images.pexels.com/photos/3246665/pexels-photo-3246665.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }
            alt=''
            sx={{borderTopLeftRadius:"90px", borderBottomLeftRadius: '90px'}}
            className='w-1/4'
            />

            <div className='flex flex-col gap-3 w-[3/4] p-2'>

                <div className=''>
                    
                    <Button href={`/articles/post/${slug}`}>
                        <Typography variant='h3' sx={{fontSize: '1.5rem'}} className=''>
                            {title}
                        </Typography>
                    </Button>
                </div>

                <div className=''>
                    <Typography variant='body1' sx={{}} className=''>
                        Author
                    </Typography>
                </div>

                <div className=''>
                    <Typography variant='body1' sx={{}} className='truncate-text w-3/4 sm:w-[375px]'>
                        {excerpt}
                    </Typography>
                </div>

            </div>

        </div>
    </Box>
  )
}

export default SmallBlogCard