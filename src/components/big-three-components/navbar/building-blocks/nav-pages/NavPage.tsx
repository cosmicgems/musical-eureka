import React from 'react'
import { Button } from '@mui/material'
import { motion } from 'framer-motion'



const NavPage = ({ page}) => {
    return (
      <Button  sx={{ color: '#fff', marginInlineEnd: '2vw' }} href={page.path}>

        <motion.div
        whileHover={{ scale: 2 }}
        whileTap={{ scale: 0.9 }}>
            {page.name}
        </motion.div>

      </Button>
    )
}

export default NavPage