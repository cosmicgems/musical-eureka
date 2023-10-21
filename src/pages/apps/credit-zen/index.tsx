import React from 'react'
import AppComingSoon from '../../../components/AppComingSoon'
import Hero from '../../../components/Credit Zen/Hero/Hero'
import SimpleProcessSection from '../../../components/Credit Zen/Process/SimpleProcessSection'
import CreditRepairVsCreditBuilding from '../../../components/Credit Zen/Repair_Vs_Building/CreditRepairVsCreditBuilding'
import CreditCost from '../../../components/Credit Zen/Credit_Cost/CreditCost'
import { Box } from '@mui/material'
import Layout from '../../../components/Layout'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../styles/theme/lightThemeOptions'

const RealEstateConnectApp = () => {
  const data = {
    name: "Credit Zen"
  }
  return (
    <Box>
      <Layout>
        <ThemeProvider theme={theme}>
          <Hero />
          <SimpleProcessSection />
          <CreditRepairVsCreditBuilding />
          <CreditCost />          
        </ThemeProvider>

      </Layout>
    </Box>
  )
}

export default RealEstateConnectApp