import { Box, Button, CardMedia, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown';
import parse from "html-react-parser"



interface BlogPostProps {
    blog: {
        _id: string;
        title: string;
        categories: string[];
        sub_categories: string[];
        photo: string;
        body: string;
        slug: string;
        mtitle: string;
        mdesc: string;
        createdAt: Date;
        updatedAt: Date;
    };
}

const BlogPost: React.FC<BlogPostProps> = ( {blog} ) => {

    const textRef = useRef(null);
    const {_id: id, title, categories, sub_categories, photo, body, slug, createdAt} = blog;


    const excerpt = body.substring(11, 150);

    return (
        <Box className="w-full" sx={{borderRadius: '5px', bgcolor: grey[50]}}>
            <CardMedia 
            component="img"
            image={photo}
            alt=''
            sx={{objectFit: "cover", borderTopRightRadius: "5px", borderTopLeftRadius: "5px"}}
            className=''
            />

            <div className='flex flex-col px-3 w-[100%] gap-3 py-3'>
                <Button href={`/articles/${slug}`}>
                    <Typography variant='h4' className='' sx={{}}>
                        {title}
                    </Typography>                    
                </Button>

                <Typography variant='body1' className='truncate-text w-[300px] sm:w-[375px]'   >
                        {excerpt}      

                </Typography>        
            </div>
        </Box>
    )
}

export default BlogPost