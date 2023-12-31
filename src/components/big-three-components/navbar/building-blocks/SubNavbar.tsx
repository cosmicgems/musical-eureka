import React from 'react'
import { SubNavbarContainer } from './sub-navbar'

const SubNavbar = ({ routeOptions, itemsCount, setShowCart }) => {
  return (
    <SubNavbarContainer 
    routeOptions={routeOptions}
    itemsCount={itemsCount}
    setShowCart={setShowCart}
    />
  )
}

export default SubNavbar