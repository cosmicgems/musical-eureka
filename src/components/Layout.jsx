import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import NavBar from './NavBar';
import Footer from './Footer';
import { useStateContext } from '../../Context/StateContext';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Subscribe from './Subscribe';

const Layout = ({ children}) => {
  const { pageName } = useStateContext();
  const [updated, setUpdated] = useState(false);

    const { data: session, status, update } = useSession();


  return (
    <>
      <div className='layout flex flex-col min-h-screen' style={{ minHeight: '100vh' }}>

      

        <div className='header-div' style={{ paddingInline: 0 }}>
          <header style={{ paddingInline: 0 }}>
             <NavBar />
          </header>
        </div>
        <Subscribe />
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
