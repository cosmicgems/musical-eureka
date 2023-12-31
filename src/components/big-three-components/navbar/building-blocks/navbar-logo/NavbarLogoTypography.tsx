import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Typography } from '@mui/material'

const NavbarLogoTypography = () => {
    return (
        <Link href='/'>

            <motion.div
            whileTap={{ scale: 0.9 }}>

                <Typography
                className='gradient-text-subcategories'
                variant="h5"
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, fontSize: '3rem' }}
                >
                    Pearl Box
                </Typography>  
                
            </motion.div>
    
        </Link>  
    )
}

export default NavbarLogoTypography