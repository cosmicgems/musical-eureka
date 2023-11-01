import { Button, ButtonGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { USDollar } from '../../../../helpers/usd'
import { useStateContext } from '../../../../Context/StateContext'
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';

const ProductCard = ({product, goToProductPage}) => {
    const { onAdd  } = useStateContext();
    const [showCartActions, setShowCartActions] = useState<boolean>(false);
    const [travel, setTravel] = useState<boolean>(true);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    // console.log(product);
    const handleClick = (e, handle) =>{
        e.preventDefault();
        if(!travel){
            return
        }
        goToProductPage(handle)  
        
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1025) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <motion.div
            onHoverStart={()=>{if(isMobile) return;setShowCartActions(true)}}
            onHoverEnd={()=>{if(isMobile) return;setShowCartActions(false)}}
            whileHover={{scale: 1.1, cursor:"pointer"}} 
            onClick={(e)=>{handleClick(e, product.node.handle)}} 
            className='w-[45vw] h-[33vh] md:w-[17.5vw] md:h-[45vh] rounded' 
            style={{backgroundImage: `url('${product.node.images.edges[0].node.url}')`, backgroundPosition: 'center',boxShadow: '5px 5px 7px 5px #dedede', backgroundRepeat:'no-repeat', backgroundSize: "cover"}}>
                <div className='w-[100%] sm:flex sm:flex-col '>

                    {
                        !showCartActions ?
                            <div className='bg-slate-950/40 min-h-[17vh] p-3 rounded flex flex-col'>
                                <Typography variant='body2' component="div" className='gradient-text'>
                                    {product.node.title}
                                </Typography>
                                <Typography variant='body1' component="div" className='gradient-text-four'>
                                    {USDollar.format(product.node.priceRange.maxVariantPrice.amount)}
                                </Typography>
                            </div>                        
                        :
                        showCartActions ?
                        <>
                            <div onMouseOver={()=> {setTravel(false)}} onMouseLeave={()=>{setTravel(true)}}  className='w-[45vw] h-[33vh] md:w-[17.5vw] md:h-[45vh] flex flex-col justify-end '>
                                <ButtonGroup variant='contained'>
                                    <Button onClick={()=>{console.log(product); onAdd(product, 1)}} sx={{borderTopLeftRadius: '0', borderTopRightRadius: '0'}} className='w-full'>
                                        <AddShoppingCartRoundedIcon />
                                    </Button>
                                    <Button sx={{borderTopLeftRadius: '0', borderTopRightRadius: '0'}} className='w-full'>
                                        <ShoppingCartCheckoutRoundedIcon />
                                    </Button>
                                </ButtonGroup>       
                            </div>                        
                        </>
   
                    :
                    null   
                    }


                </div>
            </motion.div>

            <div className=' w-[100%] mb-3 flex flex-col lg:hidden '>

                <div onMouseOver={()=> {setTravel(false)}} onMouseLeave={()=>{setTravel(true)}}  className='w-[45vw]  md:h-[45vh] flex flex-col  '>
                    <ButtonGroup variant='contained' >
                        <Button onClick={()=>{console.log(product); onAdd(product, 1)}} sx={{borderTopLeftRadius: '0', borderTopRightRadius: '0'}} className='w-full'>
                            <AddShoppingCartRoundedIcon />
                        </Button>
                        <Button sx={{borderTopLeftRadius: '0', borderTopRightRadius: '0'}} className='w-full'>
                            <ShoppingCartCheckoutRoundedIcon />
                        </Button>
                    </ButtonGroup>       
                </div>  

            </div>

        </>


    )
}

export default ProductCard