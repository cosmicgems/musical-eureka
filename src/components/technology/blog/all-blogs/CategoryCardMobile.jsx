import React from 'react'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

const CategoryCardMobile = ({category: {name, image}}) => {
    const handleClick = () => {
      console.info(name);
    };
  return (
    <div className='mb-3'>
        <Chip 
        avatar={<Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />}
        label={name} 
        onClick={handleClick} 
          sx={{width: {lg: '14vw'}}}
        />
          
      
    </div>
  )
}

export default CategoryCardMobile