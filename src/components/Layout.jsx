"use client";

import React, { useEffect, useState, cloneElement } from 'react';
import Head from 'next/head';
import NavBar from './NavBar';
import Footer from './Footer';
import { useStateContext } from '../../Context/StateContext';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Subscribe from './Subscribe';
import NextAuthProvider from "../../lib/NextAuthProvider"
import Loading from './Loading';
import { Typography } from '@mui/material';


const Layout = ({ children}) => {
  const {data: session, status} = useSession();
  const [user, setUser] = useState(null);

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

      
      {/* <NextAuthProvider> */}
          <div className='header-div mb-20 sm:mb-0' style={{ paddingInline: 0 }}>
            <header style={{ paddingInline: 0 }}>
              <NavBar user={user} />
            </header>
          </div>
          <Subscribe user={user} />
          <main style={{overflowX: 'hidden'}} className='main-container grow  max-w-screen '>
          {children}
          </main>
          <footer className='footer'>
            <Footer />
          </footer>        
      {/* </NextAuthProvider> */}


      </div>
    </>
  );
};



export default Layout;
