import { Avatar, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import moment from 'moment'
import React from 'react'

const BlogCardCreator = ({
    postedBy,
    createdAt,
}) => {
    return (

        <div className='flex flex-row  gap-2'>

            <div className='flex justify-center items-center gap-3 bg-gray-950/50 rounded-full p-1'>
                
                <div className='flex flex-col justify-center items-center'>
                    <Avatar sx={{ width: "50px", height: "50px", boxShadow: "1px 1px 3px 1px #000"}} alt={`${postedBy.first_name} ${postedBy.last_name}`} src={postedBy.photo} />
                </div>

            </div>

            <div className='flex flex-col justify-center items-start bg-gray-950/50 rounded p-2'>
                
                    <Typography variant='body1' sx={{color: grey[50]}} className='text-left'>
                        {postedBy.first_name} {postedBy.last_name}
                    </Typography>
                    <Typography variant='body1' sx={{color: grey[50]}} className='text-left'>
                        {moment(createdAt).fromNow()}
                    </Typography>
            

            </div>

        </div>

    )
}

export default BlogCardCreator