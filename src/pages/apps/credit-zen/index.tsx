import React, { useState } from 'react'
import AppComingSoon from '../../../components/AppComingSoon'
import Hero from '../../../components/Credit Zen/Hero/Hero'
import SimpleProcessSection from '../../../components/Credit Zen/Process/SimpleProcessSection'
import CreditRepairVsCreditBuilding from '../../../components/Credit Zen/Repair_Vs_Building/CreditRepairVsCreditBuilding'
import CreditCost from '../../../components/Credit Zen/Credit_Cost/CreditCost'
import { Box } from '@mui/material'
import Layout from '../../../components/Layout'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../styles/theme/lightThemeOptions'
import { useSession } from 'next-auth/react'

interface Session {
  data:{
      user:{
          about: string;
          confirmed_account: boolean;
          createdAt: Date;
          email: string;
          first_name: string;
          last_name: string;
          password: string;
          photo: string;
          role: number;
          updatedAt: Date;
          username: string;
          verification_token: string;
          verification_token_expiration: string;
          _id: string;
          
      }      
  },
  status: string;

}

const RealEstateConnectApp = () => {
  const [user, setUser] = useState<any>(null);
  const {data: session, status} = useSession() as Session;
  
  if(status === "loading"){
    return <p>Loading...</p>
  }
  
  if (user === null) {
    setUser(session.user);
  }

  if(status === "authenticated"){
    
    return (
      <Box>
        <Layout>
          <ThemeProvider theme={theme}>
            <Hero user={user} />
            <SimpleProcessSection />
            <CreditRepairVsCreditBuilding />
            <CreditCost />          
          </ThemeProvider>

        </Layout>
      </Box>
    )
  }

  return (
    <Box>
      <Layout>
        <ThemeProvider theme={theme}>
          <Hero user={user} />
          <SimpleProcessSection />
          <CreditRepairVsCreditBuilding />
          <CreditCost />          
        </ThemeProvider>

      </Layout>
    </Box>
  )
}

export default RealEstateConnectApp