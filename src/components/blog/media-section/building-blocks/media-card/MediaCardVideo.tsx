import React from 'react'

const MediaCardVideo = ({video}) => {
    return (
      <iframe
        className="w-[350px] sm:w-[400px] h-[197px] sm:h-[225px]"
        src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
        title={video.snippet.title}
        style={{borderRadius: '5px'}}
        allowFullScreen
      />
    )
}

export default MediaCardVideo