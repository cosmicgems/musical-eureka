import React from 'react'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { urlFor } from '../../../../lib/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useStateContext } from '../../../../Context/StateContext';

const CategoryCard = ({category: {name, photo, slug}}) => {
  const {pathSegment, } = useStateContext();
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };
  console.log(photo);
  return (
    <div className='mb-3'>
      <Link href={`/${pathSegment}/categories/category/${slug.current}`} >
        <Chip clickable
        avatar={<Avatar alt="Cindy Baker" src={photo.url} />}
        label={name} 
          sx={{width: {lg: '14vw'}}}
        />        
      </Link>
    </div>
  )
}

export default CategoryCard