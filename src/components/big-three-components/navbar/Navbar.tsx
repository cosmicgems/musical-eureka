import React from 'react'
import { NavbarContainer } from './building-blocks'
import { userChipItems } from 'public/assets/userChipItems';

function Navbar ({ user }) {
  
  
  return (

    <NavbarContainer user={user} />
    
  )
}

export default Navbar