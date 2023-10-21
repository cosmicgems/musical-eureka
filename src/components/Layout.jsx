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
      <div className='layout flex flex-col min-h-screen' style={{ minHeight: '100vh' }}>


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

          {/* <Subscribe user={user} /> */}

          <main style={{overflowX: 'hidden'}} className='main-container grow  max-w-screen '>
            {children}
          </main>

          <footer className='footer'>
            <Footer />
          </footer>


      </div>
    </>
  );
};



export default Layout;
