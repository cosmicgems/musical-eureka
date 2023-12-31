import React from 'react'
import SubNavbarPagesContainer from './SubNavbarPagesContainer'
import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import { CartBtn } from '../cart-btn'

const SubNavbarContainer = ({ routeOptions, setShowCart, itemsCount }) => {
    return (
        <Box sx={
            {
                bgcolor: grey[800]
            }
        }
        className="w-full"
        >

            <SubNavbarPagesContainer 
            routes={routeOptions} 
            itemsCount={itemsCount} 
            setShowCart={setShowCart} 
            />
            

        </Box>
    )
}

export default SubNavbarContainer