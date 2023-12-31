import { AppBar, Box } from '@mui/material'
import React, { useState } from 'react'
import MainNavbar from './MainNavbar'
import SubNavbar from './SubNavbar'
import MobileDrawer from './MobileDrawer'
import { grey } from '@mui/material/colors'
import { useStateContext } from 'Context/StateContext'
import { storeNavItems } from 'public/assets/navItems'
import useCart from '@common/cart/use-cart'
import Cart from '@components/Store/Cart/Cart'
import { navItems } from 'public/assets/navItems'

const NavbarContainer = ({user}) => {
    
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const { data } = useCart();
    const { setShowCart, showCart } = useStateContext();
    const { pathSegment } = useStateContext();

    const routeOptions = () => {
        if (pathSegment === "store") {
            return storeNavItems
        }
    }

    const itemsCount = data?.lineItems.reduce((count, item) => {
        return count + item.quantity
    }, 0) ?? 0
    
    const appBarBackgroundColor = grey[900];
    const drawerPages = navItems;
    const subDrawerPages = () => {
        if (pathSegment === "store") {
            return storeNavItems
        }
        return null
    }

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

// console.log(`pathsegment: ${pathSegment}`);

    return (

        <Box sx={{ display: 'flex', paddingBlock:0 , width: '100%', bgcolor: appBarBackgroundColor,}}>
            
            <AppBar component="nav" className='' sx={{paddingBlock: 0, width: {xs: '100%', sm: '100%'}, paddingInlineEnd: 0 , bgcolor: grey[900]}}>
                
                <MainNavbar 
                user={user} 
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                handleDrawerToggle={handleDrawerToggle}
                />

                {
                    subDrawerPages()?.length > 0 &&
                    <SubNavbar routeOptions={routeOptions()} itemsCount={itemsCount} setShowCart={setShowCart} />
                }
                
                
                {
                    showCart &&
                    <Cart />
                }

            </AppBar>

            <MobileDrawer 
            drawerPages={drawerPages}
            subDrawerPages={subDrawerPages()}
            user={user}
            handleDrawerToggle={handleDrawerToggle}
            mobileOpen={mobileOpen}
            />

        </Box>

    )
}

export default NavbarContainer