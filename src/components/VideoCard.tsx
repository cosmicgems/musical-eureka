import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

interface ResourceId {
    kind: string;
    videoId: string;
}

interface Snippet {
    channelId: string;
    channelTitle: string;
    description: string;
    playlistId: string;
    position: number;
    publishedAt: string;
    resourceId: ResourceId;
    title: string;
}


interface VideoProps {
    video: {
        id: string;
        kind: string;
        etag: string;
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
        snippet: Snippet;
    };
}


const VideoCard: React.FC<VideoProps> = ( {video} ) => {
  return (
    <Box sx={{bgcolor: grey[100], borderRadius: "5px", boxShadow: '5px 5px 5px #000'}} className="w-[350px] sm:w-[400px]">
            <iframe
            className="w-[350px] sm:w-[400px] h-[197px] sm:h-[225px]"
            src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
            title={video.snippet.title}
            style={{borderRadius: '5px'}}
            allowFullScreen
            >
            </iframe>
            <div className='p-3 flex flex-col gap-3'>
                <Typography variant='h3' className='gradient-text-three text-center' sx={{fontSize: '1.5rem'}}>{video.snippet.title}</Typography>
                <Typography variant='body1' className='truncate-text' sx={{color:grey[900]}}>{video.snippet.description}</Typography>                
            </div>

    </Box>
  )
}

export default VideoCard