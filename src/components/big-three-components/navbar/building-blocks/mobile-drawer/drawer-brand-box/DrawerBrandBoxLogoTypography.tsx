import { Typography } from '@mui/material'
import React from 'react'

const DrawerBrandBoxLogoTypography = ({name}) => {
    return (
      <Typography className='gradient-text font-bold' variant="h6" sx={{  px:2, fontSize: '2rem' }}>
        {name}
      </Typography>
    )
}

export default DrawerBrandBoxLogoTypography