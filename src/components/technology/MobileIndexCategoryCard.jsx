import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardMedia } from '@mui/material'
import { useStateContext } from '../../../Context/StateContext'

const MobileIndexCategoryCard = ({page:{name, image, id, title, href }}) => {
    const {setIndustryHoverName} = useStateContext();
  return (
    <Link href={href}>
      <motion.div
      whileHover={{x: '-50%', scaleX: 1.1 }}
      whileTap={{ scaleX: 0.9 }}
      >
        <Card sx={{borderRadius: 0, height: '50'}}
        >
          <CardMedia
          id={id}
          sx={{  objectFit: 'cover', height: '50vh' }}
          image={image}
          title={title}
          onMouseOver={(e)=>{setIndustryHoverName(e.target.id)}}
          />      

        </Card>          
      </motion.div>      
    </Link>
  )
}

export default MobileIndexCategoryCard