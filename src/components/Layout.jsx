import React, { useEffect } from 'react'
import Head from 'next/head'
import NavBar from './NavBar'
import Footer from './Footer'
import { useStateContext } from '../../Context/StateContext'
import { getCategories } from '../../sanity/query functions/query'

const Layout = ({children, categories}) => {
    const {pageName, pathSegment} = useStateContext();

  return (
    <>
    <div className='layout' style={{maxHeight: '100vh', }}>
      <Head>
        <title>Home Junky</title>
      </Head>
      <header>
      {
        pageName !== '/' && <NavBar />
      }
        
      </header>
      <main className='main-container' >
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>      
    </>

  )
}

export default Layout