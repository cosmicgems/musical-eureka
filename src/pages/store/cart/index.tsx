import { Box, Button, CardMedia, Typography } from '@mui/material'
import React from 'react'
import Layout from '../../../components/Layout'
import { useStateContext } from '../../../../Context/StateContext'
import { USDollar } from '../../../../helpers/usd'
import { grey } from '@mui/material/colors'
import MobileCart from '../../../components/Store/Cart Page/MobileCart'
import FullCart from '../../../components/Store/Cart Page/FullCart'

const CartPage = () => {

  const { cartItems, cartTotal } = useStateContext();
  

  return (
    <Box>
      <Layout>

        <div className='md:hidden'>
          <MobileCart />
        </div>
        <div className='hidden md:flex'>
          <FullCart />
        </div>

      </Layout>
    </Box>
  )
}

export default CartPage