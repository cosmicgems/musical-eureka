import React from 'react'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { urlFor } from '../../../../lib/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useStateContext } from '../../../../Context/StateContext';
import { grey } from '@mui/material/colors';
import { motion } from 'framer-motion'

const CategoryCard = ({category: {name, photo:{url}, slug}}) => {
  const {pathSegment, } = useStateContext();
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };
  // console.log(url);
  return (
    <motion.div 
    whileHover={{ scale: 2 }}
    whileTap={{ scaleX: 0.9 }} 
    className='mb-3'>
      <Link href={`/${pathSegment}/categories/category/${slug.current}`} >
        <Chip clickable
        avatar={<Avatar alt="Cindy Baker" src={url} />}
        label={name} 
          sx={{width: {lg: '14vw'}, color: grey[50], fontSize:'1rem'}}
        />        
      </Link>
    </motion.div>
  )
}

export default CategoryCard