import React from 'react'
import { IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router'
import { useStateContext } from 'Context/StateContext'
import { AuthBox, NavLogo, NavPages, SearchBar } from '.';
import SearchResults from '@components/Search Bar/SearchResults';
import { brandAssets as logo } from 'public/assets/navbarBrandingAssets'
import { NavbarLogo } from './navbar-logo';

const MainNavbar = ({
    user, 
    mobileOpen, 
    setMobileOpen,
    loggedIn, 
    setLoggedIn,
    handleDrawerToggle,
}) => {
    
    const { pathSegment, subcategories } = useStateContext();

    const router = useRouter();

    const handleSignin = (e: any) => {
        e.preventDefault();
        router.push("/auth/login");
    };

    const handleSignup = (e: any) => {
        e.preventDefault();
        router.push("/auth/signup");
    }

    return (

        <Toolbar sx={{paddingBlock: 0, }}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuIcon />
            </IconButton>


            <div className='md:hidden grow'>
                {
                    logo[0].logo &&
                    <NavbarLogo logo={logo} />
                }
            </div>
            {/* <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                flexGrow: 1, 
                fontSize: "1.65rem",
                ml: 'auto',
                display: { sm: 'none' },
                }}
                className='gradient-text-subcategories'
            >
                Pearl Box
            </Typography> */}

            <NavLogo />

            <div className='md:w-1/3 md:mr-6 mr-2'>
                <SearchBar />
            </div>            

            <NavPages />

            <AuthBox user={user} loggedIn={loggedIn} />

        </Toolbar>

    )
}

export default MainNavbar