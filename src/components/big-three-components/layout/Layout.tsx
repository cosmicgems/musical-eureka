"use client"
import React, { useState } from 'react'
import { ThemeProvider } from '@emotion/react'
import { ApiProvider } from '@framework'
import { useStateContext } from 'Context/StateContext'
import lightTheme from 'utility/lightTheme'
import Navbar from '../navbar/Navbar'
import { useSession } from 'next-auth/react'
import { Typography } from '@mui/material'
import Subscribe from '../subscribe/Subscribe'
import Footer from '../footer/Footer'
import { Session, User } from 'src/utility/types/Session'



const Layout = ({ children,  }: any) => {
  
  const {data: session, status} = useSession() as Session;
  const {pageName, pathName, pathSegment, appName} = useStateContext();
  const [user, setUser] = useState<User>(null);

  if(status === "loading"){
    return (
      <div className='min-h-screen flex flex-col justify-center items-center'>
          <Typography variant='h2' className='gradient-text w-full'>
            Loading...
          </Typography>
        </div>
    )
  }

  if(status === "authenticated"){
    if(user === null){
      setUser(session.user)
    }
  }
  
  const theme = () => {
    return lightTheme
  }

  return (

    <div className='min-h-screen flex flex-col overflow-y-hidden'>

      <ApiProvider>

        <ThemeProvider theme={theme}>

          <header>
            <Navbar user={user} />
          </header>

          <Subscribe user={user} />

          <main style={{overflowX: 'hidden'}} className='main-container grow  max-w-screen '>
            <div className='pt-12'>
              {children}
            </div>
          </main>

          <footer className='footer'>
            <Footer />
          </footer>

        </ThemeProvider>

      </ApiProvider>

    </div>

  )
}

export default Layout