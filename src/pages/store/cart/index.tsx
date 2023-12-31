import { Box, Button, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { Layout } from '@components/big-three-components'
import { useStateContext } from '../../../../Context/StateContext'
import { USDollar } from '../../../../helpers/usd'
import { grey } from '@mui/material/colors'
import MobileCart from '../../../components/Store/Cart Page/MobileCart'
import FullCart from '../../../components/Store/Cart Page/FullCart'
  import useCart from '@common/cart/use-cart'

const CartPage = () => {
  

  
  

  return (
    <Box>
      <Layout>

        
        <FullCart />
        

      </Layout>
    </Box>
  )
}

export default CartPage