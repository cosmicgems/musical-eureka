import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { Product } from '@common/types/product';
import Overlay from './Overlay';
import Buttons from './Buttons';
import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';

const MainContainer = ({ goToProductPage, product }: { goToProductPage: any, product: Product}) => {

    const [showCartActions, setShowCartActions] = useState<boolean>(false);
    const [travel, setTravel] = useState<boolean>(true);

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

    

    const handleClick = (e, p) => {
        e.preventDefault();
        if(!travel){
            return
        }
        goToProductPage(p)
    }


    return (
            <motion.div
            onHoverStart={()=>{if(isMobile) return;setShowCartActions(true)}}
            onHoverEnd={()=>{if(isMobile) return;setShowCartActions(false)}}
            whileHover={{scale: 1.1, cursor:"pointer"}} 
            onClick={(e)=>{handleClick(e, product.path)}} 
            className='w-[45vw] h-[33vh] md:w-[17.5vw] md:h-[45vh] rounded' 
            style={{backgroundImage: `url(${product.images[0].url})`, backgroundPosition: 'center',boxShadow: '5px 5px 7px 5px #dedede', backgroundRepeat:'no-repeat', backgroundSize: "cover"}}>
                <div className='w-[100%] h-full sm:flex sm:flex-col '>
                    {
                        !showCartActions ?
                            <Overlay product={product} />
                        :
                            <Buttons product={product} />
                    }
                </div>
                {/* <Box sx={{color: grey}} */}
            </motion.div>
    )
}

export default MainContainer