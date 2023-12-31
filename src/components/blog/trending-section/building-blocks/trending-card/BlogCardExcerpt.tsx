import { Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

const BlogCardExcerpt = ({
    excerpt,
    excerptTwo,
}) => {
    return (
        <div className='bg-gray-950/50 rounded p-2'>
                <Typography variant='caption' sx={{color: grey[50]}} className='truncate-text-trend w-full '   >
                    {
                        excerpt ?
                        <>
                        {excerpt}
                        </>
                        
                        :
                        <>
                        {excerptTwo} 
                        </>
                    }
                </Typography> 
        </div>
    )
}

export default BlogCardExcerpt