import { Box } from '@mui/material'
import { navItems } from 'public/assets/navItems'
import React from 'react'
import NavPage from './NavPage'

const NavPagesContainer = () => {
    return (

      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

        {
          navItems?.map((page) => (
            <NavPage key={`${page.name} key: ${page.path}`} page={page}  />
          ))
        }

      </Box>

    )
}

export default NavPagesContainer