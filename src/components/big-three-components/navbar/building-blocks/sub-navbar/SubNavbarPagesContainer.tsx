import { Box } from '@mui/material'
import React from 'react'
import { CartBtn } from '../cart-btn'
import SubNavbarPage from './SubNavbarPage'

const SubNavbarPagesContainer = ({
    routes, 
    itemsCount, 
    setShowCart
}) => {
    return (
        <Box 
        className="hidden sm:flex justify-between px-3 " 
        sx={
            { 
                display: { xs: 'none', sm: 'block' } 
            }
        }
        >

            {
                routes?.map((route) => (
                    <SubNavbarPage 
                    key={`${route.name} key : ${route.path}`} 
                    page={route} 
                    />
                ))
            }
            
            <CartBtn itemsCount={itemsCount} setShowCart={setShowCart} />
        </Box>
    )
}

export default SubNavbarPagesContainer