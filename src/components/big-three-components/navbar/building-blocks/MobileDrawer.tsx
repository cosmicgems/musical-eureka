import React from 'react'
import { MobileDrawerContainer } from './mobile-drawer'

const MobileDrawer = ({ 
  drawerPages, 
  subDrawerPages,
  user,
  handleDrawerToggle,
  mobileOpen,
}) => {
    return (

      <MobileDrawerContainer 
      drawerPages={drawerPages} 
      subDrawerPages={subDrawerPages}
      user={user}
      handleDrawerToggle={handleDrawerToggle}
      mobileOpen={mobileOpen}
      />

    )
}

export default MobileDrawer