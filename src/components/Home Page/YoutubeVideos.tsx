import { Typography } from '@mui/material'
import React from 'react'
import VideoCard from '../VideoCard'

const YoutubeVideos = ({videos}) => {
  return (
    <div>
        <div className='w-full'>
        <Typography variant='h3' sx={{}} className='w-full text-center gradient-text-subcategories'>
            Media
        </Typography>
        </div>

            {
                videos?.length > 0 ?
                    <div   className='flex gap-6 overflow-x-auto  pb-6 w-[100%] '>
                        {videos.map((v, i) => {
                            if (videos.length > 0) {
                                return(
                                    <div key={i} className='p-3'>
                                        <VideoCard video={v} />
                                    </div>
                                )                                    
                            } else if (videos.length <= 0) {
                            return(
                                <div key="none" className='p-3'>
                                    <Typography variant='h2' className='gradient-text-four' >
                                        Google Quota Reached.
                                    </Typography>
                                </div>
                            )
                            }

                        })}
                    </div>
                :
                <div className='h-full flex justify-center items-center'>
                    <Typography variant='h2' className='gradient-text-three text-center'>
                        Request quota limit has been reached.
                    </Typography>                                    
                </div>

            }

    </div>
  )
}

export default YoutubeVideos