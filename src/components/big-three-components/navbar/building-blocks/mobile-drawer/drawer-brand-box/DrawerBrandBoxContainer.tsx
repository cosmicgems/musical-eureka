import React from 'react'
import { brandAssets } from 'public/assets/navbarBrandingAssets'
import { Typography } from '@mui/material';
import DrawerBrandBoxLogoTypography from './DrawerBrandBoxLogoTypography';
import DrawerBrandBoxLogo from './DrawerBrandBoxLogo';

const DrawerBrandBoxContainer = () => {

  const brand = brandAssets[0];

    return (
      <div className='flex gap-1 justify-center items-center'>

        {
          brand.logo &&
            <DrawerBrandBoxLogo logo={brand} />
        }
        

        <DrawerBrandBoxLogoTypography name={brand.name} />

      </div>
    )
}

export default DrawerBrandBoxContainer