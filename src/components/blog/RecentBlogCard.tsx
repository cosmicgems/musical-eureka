import { Box, Button, CardMedia, Typography } from '@mui/material';
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

const RecentBlogCard: React.FC<BlogPostProps> = ( {blog} ) => {

    const {_id: id, title, categories, sub_categories, photo, body, slug, createdAt} = blog;


    const excerpt = body.substring(11, 150);

    

  return (
    <Box className="w-full" sx={{borderRadius: '5px', bgcolor: grey[50]}}>
        <CardMedia 
        component="img"
        image={photo  ? photo : "https://images.pexels.com/photos/3246665/pexels-photo-3246665.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }
        alt=''
        sx={{objectFit: "cover", borderTopRightRadius: "5px", borderTopLeftRadius: "5px"}}
        className='h-[25vh]'
        />
        
        <div className='flex flex-col gap-3 p-3 text-center'>

            <div>
                <Button href={`/articles/post/${slug}`}>
                    <Typography sx={{fontSize: '2rem'}} variant='h3' className=''>
                        {title}
                    </Typography>                
                </Button>

            </div>

            <div>
                User/Author Placeholder
            </div>

            <div>
                <Typography variant='body1' sx={{}} className='truncate-text  w-[325px] sm:w-[375px]'>
                    {excerpt}
                </Typography>
            </div>

        </div>


    </Box>
  )
}

export default RecentBlogCard