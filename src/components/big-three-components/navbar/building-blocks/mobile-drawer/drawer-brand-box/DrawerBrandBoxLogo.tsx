import { Button, CardMedia } from '@mui/material'
import React from 'react'

const DrawerBrandBoxLogo = ({logo}) => {
    return (
        <div className=''>

            <Button href='/'>

                <CardMedia 
                component="img"
                src={logo.logo[0]}
                alt={logo.name}
                className='w-[35px] h-[35px]'
                />        

            </Button>

        </div>
    )
}

export default DrawerBrandBoxLogo