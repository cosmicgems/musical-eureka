import { Button, Typography } from '@mui/material'
import React from 'react'

const BlogCardTitle = ({
    handleNavigate,
    title,
}) => {
    return (
        
        <div className='bg-gray-950/50 rounded p-2'  onClick={(e)=> {handleNavigate(e)}} >
            <Typography variant='caption' className='gradient-text-category  w-full text-left truncate-title' sx={{ width: "100%"}}>
                {title}
            </Typography>                    
        </div>

    )
}

export default BlogCardTitle