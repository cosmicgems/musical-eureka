"use client";

import React, { useEffect, useState, cloneElement } from 'react';
import Head from 'next/head';
import NavBar from './NavBar';
import Footer from './Footer';
import { useStateContext } from '../../Context/StateContext';
import { useSession } from 'next-auth/react';
import Subscribe from './Subscribe';
import { Typography } from '@mui/material';
import AppBarNavbar from "./AppBarNavbar"
import DynamicMobileUserChip from './User/DynamicMobileUserChip';
import { ThemeProvider } from '@emotion/react';
import theme from '../styles/theme/lightThemeOptions';
import lightTheme from '../../utility/lightTheme'
import StoreNavbar from './StoreNavbar';


const Layout = ({ children}) => {
  const {data: session, status} = useSession();
  const [user, setUser] = useState(null);

  const {pageName, pathName, pathSegment, appName} = useStateContext();
  console.log(pathSegment);

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



  return (
    <>
    {
      appName === null && pathSegment !== "store" ?
      <div className='layout flex flex-col min-h-screen' style={{ minHeight: '100vh' }}>
        <ThemeProvider theme={lightTheme} >
            <div className={appName === null ? 'header-div mb-20 sm:mb-0' : "header-div "} style={{ paddingInline: 0 }}>



              <header style={{ paddingInline: 0 }}>

                {
                  appName === null ?
                  <NavBar user={user} />
                  :
                  <AppBarNavbar user={user} />
                }

                


              </header>

            </div>

            {
              appName === null ?
              <Subscribe user={user} />
              :
              null
            }

            {
              appName === null ?
              null:
              <div className='absolute mt-20 w-screen flex md:justify-end md:items-end'>
                <div className='w-full md:w-2/5'>
                  <DynamicMobileUserChip user={user} />
                </div>
              </div>            
            }

            

            <main style={{overflowX: 'hidden'}} className='main-container grow  max-w-screen '>
              {children}
            </main>

            <footer className='footer'>
              <Footer />
            </footer>

        </ThemeProvider>



      </div>
      :
      appName === null && pathSegment === 'store' ?
      <div className='layout flex flex-col min-h-screen' style={{ minHeight: '100vh' }}>
        <ThemeProvider theme={lightTheme} >
            <div className={appName === null ? 'header-div mb-20 sm:mb-0' : "header-div "} style={{ paddingInline: 0 }}>



              <header style={{ paddingInline: 0 }}>

                {
                  appName === null ?
                  <NavBar user={user} />
                  :
                  <AppBarNavbar user={user} />
                }

                


              </header>

            </div>

            {
              appName === null ?
              <Subscribe user={user} />
              :
              null
            }

            {
              appName === null ?
              null:
              <div className='absolute mt-20 w-screen flex md:justify-end md:items-end'>
                <div className='w-full '>
                  <DynamicMobileUserChip user={user} />
                </div>
              </div>            
            }

            

            <main style={{overflowX: 'hidden'}} className='main-container grow  max-w-screen '>
              {children}
            </main>

            <footer className='footer'>
              <Footer />
            </footer>

        </ThemeProvider>

      </div>
      :
      <>
        
          <div className='layout flex flex-col min-h-screen' style={{ minHeight: '100vh' }}>


              <ThemeProvider theme={lightTheme} >
              <div className={appName === null ? 'header-div mb-20 sm:mb-0' : "header-div "} style={{ paddingInline: 0 }}>



                <header style={{ paddingInline: 0 }}>

                  {
                    appName === null ?
                    <NavBar user={user} />
                    :
                    <AppBarNavbar user={user} />
                  }

                  


                </header>

              </div>

              {
                appName === null ?
                <Subscribe user={user} />
                :
                null
              }

              {
                appName === null ?
                null:
                <div className='absolute mt-20 w-screen flex md:justify-end md:items-end h-content'>
                  <div className='w-full md:w-[33.3%]'>
                    <DynamicMobileUserChip user={user} />
                  </div>
                </div>            
              }
              </ThemeProvider>
              
            <ThemeProvider theme={theme}>
              <main style={{overflowX: 'hidden'}} className='main-container grow  max-w-screen  '>
                {children}
              </main>     
            </ThemeProvider> 

              <footer className='footer'>
                <Footer />
              </footer>


          </div>          
      </>


    }



    </>
  );
};



export default Layout;
