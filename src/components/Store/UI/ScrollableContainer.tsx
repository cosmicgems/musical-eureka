import { Box, Typography } from '@mui/material'
import React from 'react'
import { LeftScrollButton, RightScrollButton } from './scroll-container'
import ProductsListContainer from '../Products/ProductsListContainer'

const ScrollableContainer = ({data, handleHeroNav, heroRef, type, children}: any ) => {

  const maxWidth =  (type==="articles") ? "md:w-[75%]" : (type==="trending") ? "md:w-[75%]" : "md:max-w-[75%]"

  return (
    <Box className={`w-screen ${maxWidth} md:flex md:items-center ${type==="trending" && "rounded-left"}`}>
        <LeftScrollButton handleHeroNav={()=>{handleHeroNav("left")}} />
        {
            (data && data.length > 0 && type === "products" ) ?
            <div  className='flex overflow-x-auto md:overflow-x-hidden  pl-6 sm:pl-12 py-6 pr-12 gap-6 sm:gap-20 w-screen snap-mandatory snap-x' ref={heroRef}>
              {children}
            </div>
              :
              (data && data.length > 0 && type === "collections" ) ?
              <div  className='flex overflow-x-auto md:overflow-x-hidden  pl-6 sm:pl-12 py-6 pr-12 gap-6 sm:gap-20 w-screen snap-mandatory snap-x' ref={heroRef}>
                {children}
              </div>
              :
              (data && data.length > 0 && type === "articles" ) ?
              <div  className='flex overflow-x-auto md:overflow-x-hidden  pl-6 sm:pl-12 py-6 pr-12 gap-6 sm:gap-20 w-screen snap-mandatory snap-x' ref={heroRef}>
                {children}
              </div>
              :
              (data && data.length > 0 && type === "all-articles" ) ?
              <div  className='flex overflow-x-auto md:overflow-x-hidden  pl-6 sm:pl-12 py-6 pr-12 gap-6 sm:gap-20 w-screen snap-mandatory snap-x' ref={heroRef}>
                {children}
              </div>
              :
              (data && data.length > 0 && type === "trending" ) ?
              <div  className='flex overflow-x-auto md:overflow-x-hidden    py-6  gap-6 sm:gap-20 w-screen snap-mandatory snap-x' ref={heroRef}>
                {children}
              </div>
              :
              (data && data.length > 0 && type === "categories" ) ?
              <div  className='flex overflow-x-auto md:overflow-x-hidden    py-6  gap-6 sm:gap-20 w-screen snap-mandatory snap-x' ref={heroRef}>
                {children}
              </div>
              :
              (data && data.length > 0 && type === "videos" ) ?
              <div  className='flex overflow-x-auto md:overflow-x-hidden  pl-6 sm:pl-12 py-6 pr-12 gap-6 sm:gap-20 w-screen snap-mandatory snap-x' ref={heroRef}>
                {children}
              </div>
              :
              <>
                {
                  type === "products" ?
                    <Typography variant="body1" align="center">There are no products in this collection</Typography>
                  :
                  type === "articles" ?
                    <Typography variant="body1" align="center">There are no articles in featured collection</Typography>
                  :
                  type === "trending" ?
                    <Typography variant="body1" align="center">There are no articles in trending collection</Typography>
                  :
                  type === "videos" ?
                    <Typography variant="body1" align="center">Google quota limit reached</Typography>
                  :
                  <Typography variant="body1" align="center">There are no products in this collection</Typography>
                }              
              </>

            
          }
        <RightScrollButton handleHeroNav={()=>{handleHeroNav("right")}} />
    </Box>
  )
}

export default ScrollableContainer