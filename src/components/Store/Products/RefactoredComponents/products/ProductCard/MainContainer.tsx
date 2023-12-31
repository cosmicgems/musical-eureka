import React, { useState } from 'react'
import { motion } from "framer-motion"
import { Product } from '@common/types/product';
import Overlay from './Overlay';
import Buttons from './Buttons';

const MainContainer = ({ goToProductPage, product }: { goToProductPage: any, product: Product}) => {

    const [showCartActions, setShowCartActions] = useState<boolean>(false);
    const [travel, setTravel] = useState<boolean>(true);
    const [isMobile, setIsMobile] = useState<boolean>(false);


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
        <div className='w-[100%] sm:flex sm:flex-col '>
            {
                !showCartActions ?
                    <Overlay product={product} />
                :
                    <Buttons product={product} />
            }
        </div>
    </motion.div>
  )
}

export default MainContainer