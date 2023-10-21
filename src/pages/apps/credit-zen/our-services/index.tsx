import ClientReviews from '../../../../components/Credit Zen/Our_Services/Client_Reviews/ClientReviews'
import Hero from '../../../../components/Credit Zen/Our_Services/Hero'
import ServiceList from '../../../../components/Credit Zen/Our_Services/Service_Plans/ServiceList'
import Services from '../../../../components/Credit Zen/Our_Services/Service_Plans/Services'
import StatisticsComponent from '../../../../components/Credit Zen/Our_Services/StatisticsComponent'
import UnderstandCreditRepair from '../../../../components/Credit Zen/Our_Services/Understanding_Credit_Repair/UnderstandCreditRepair'
import React from 'react'
import Layout from '../../../../components/Layout'
import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../../styles/theme/lightThemeOptions'

const OurServicesPage = () => {
  return (
    <Box className='' sx={{}}>
      <Layout>
        
      <ThemeProvider theme={theme}>
        <Hero />
        <UnderstandCreditRepair />
        <StatisticsComponent />
        <Services/>
        <ClientReviews /> 
      </ThemeProvider>
       
      </Layout>

    </Box>
  )
}

export default OurServicesPage