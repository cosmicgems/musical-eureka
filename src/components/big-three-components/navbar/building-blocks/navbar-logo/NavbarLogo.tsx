import { Button, CardMedia } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

const NavbarLogo = ({logo}) => {

    return (
        <div>
            <Button href='/'>
                <CardMedia 
                component="img"
                src={logo[0].logo[0]}
                alt={logo[0].name}
                className='w-[35px] h-[35px]'
                />                
            </Button>
        </div>
    )

}

export default NavbarLogo