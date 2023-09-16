import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import NavBar from './NavBar';
import Footer from './Footer';
import { useStateContext } from '../../Context/StateContext';

const Layout = ({ children}) => {
  const { pageName } = useStateContext();




  return (
    <>
      <div className='layout flex flex-col min-h-screen' style={{ minHeight: '100vh' }}>

      

        <div className='header-div' style={{ paddingInline: 0 }}>
          <header style={{ paddingInline: 0 }}>
             <NavBar />
          </header>
        </div>

        <main className='main-container grow flex flex-col '>
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
