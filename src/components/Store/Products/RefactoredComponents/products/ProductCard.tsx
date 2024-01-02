import React, { useState } from 'react'
import MainContainer from './ProductCard/MainContainer'
import MobileActionButtons from './ProductCard/MobileActionButtons'

const ProductCard = ({goToProductPage, product}) => {

  const isWindowMobile = () => {
      if (typeof window !== 'undefined') {
          // Get the window width
          const windowWidth = window.innerWidth;
      
          // Define the threshold for mobile size (you can adjust this as needed)
          const mobileWidthThreshold = 768; // Example threshold for mobile screens
      
          // Check if the window width is less than the mobile threshold
          return windowWidth < mobileWidthThreshold;
      }
      
        // Default to false if window is not defined (for server-side rendering)
      return false;
  }

  const [isMobile, setIsMobile] = useState<boolean>(isWindowMobile());

  return (
    <div className='w-full snap-center flex flex-col gap-3'>
      <MainContainer  goToProductPage={goToProductPage} product={product} />
      {/* {
        isMobile &&
        <MobileActionButtons 
        product={product}
        />
      } */}
    </div>
    
  )
}

export default ProductCard