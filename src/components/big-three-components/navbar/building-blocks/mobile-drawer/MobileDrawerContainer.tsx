import { Box, Divider, Drawer } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import UserGreeting from './UserGreeting';
import DrawerBrandBox from './DrawerBrandBox';
import PageRoutes from './PageRoutes';
import SubPageRoutes from './SubPageRoutes';


const drawerWidth = 300;

const MobileDrawerContainer = ({

    drawerPages,
    subDrawerPages,
    user,
    handleDrawerToggle,
    mobileOpen,

}) => {
    
    let window
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
        keepMounted: true, // Better open performance on mobile.
        }}
        className='h-screen'
        sx={
                {
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }
        }
        >

            <Box 
            onClick={handleDrawerToggle} 
            className="h-full overflow-y-auto" 
            sx={
                { 
                    textAlign: 'left' , 
                    bgcolor:grey[900],
                    py: 3
                }
            }
            >

                <DrawerBrandBox />
                    
                <div className='px-2 my-2'>
                    <Divider 
                    className='' 
                    sx={
                        {
                            color: grey[50], 
                            borderWidth: '2px', 
                            borderRadius: '20%'
                        }
                    } 
                    />
                </div>

                <UserGreeting user={user} />

                <div className='px-2 my-2'>
                    <Divider 
                    className='' 
                    sx={
                        {
                            color: grey[50], 
                            borderWidth: '2px', 
                            borderRadius: '20%'
                        }
                    } 
                    />
                </div>

                <PageRoutes pages={drawerPages} subPages={subDrawerPages} />

            </Box>

        </Drawer>


    )

}

export default MobileDrawerContainer