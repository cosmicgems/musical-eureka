import { Box } from '@mui/material'
import React from 'react'
import { brandAssets as logo } from 'public/assets/navbarBrandingAssets'
import NavbarLogo from './NavbarLogo'
import NavbarLogoTypography from './NavbarLogoTypography'

const NavbarLogoContainer = () => {

  return (
    
    <Box className="items-center gap-2 " sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>

      {
        logo[0].logo &&
        <NavbarLogo logo={logo} />
      }


      <NavbarLogoTypography />
    </Box>

  )

}

export default NavbarLogoContainer