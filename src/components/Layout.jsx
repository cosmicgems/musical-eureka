import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import NavBar from './NavBar';
import Footer from './Footer';
import { useStateContext } from '../../Context/StateContext';
import { getCategories } from '../../sanity/query functions/query';
import { getOgImageUrl } from '../../helpers/ogImageHelper';

const Layout = ({ children, categories, ogTitle, ogDescription, ogImage }) => {
  const { pageName, pathSegment } = useStateContext();




  return (
    <>
      <div className='layout' style={{ maxHeight: '100vh' }}>

      

        <div className='header-div' style={{ paddingInline: 0 }}>
          <header style={{ paddingInline: 0 }}>
            {pageName !== '/' && <NavBar />}
          </header>
        </div>

        <main className='main-container'>
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
