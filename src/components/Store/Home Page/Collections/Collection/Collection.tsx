import { Box, CardMedia, Typography } from '@mui/material'
import React from 'react'
import {motion} from "framer-motion"
import { grey } from '@mui/material/colors'

const Collection = ({collection, goToCollectionPage}) => {
    const { id, description, image, title, handle } = collection;
    
    const handleClick = async (e, handle) => {
        e.preventDefault();
        goToCollectionPage(handle)
    }
    
  return (
    <motion.div onClick={(e)=>{handleClick(e, handle )}} className='w-screen px-3 sm:w-[450px]' whileHover={{scale:1.1, cursor: "pointer"}}>
        <Box className=" w-full min-h-[400px] rounded" sx={{boxShadow: '5px 5px 7px 5px #dedede', bgcolor:'transparent', backgroundImage: image !== null ? `url(${image.src})` : 'url("https://images.pexels.com/photos/15659742/pexels-photo-15659742/free-photo-of-closeup-of-purple-orchid-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
            <div className='p-3 min-h-[400px] bg-slate-950/40 flex flex-col justify-center items-center rounded gap-6' >
                <Typography variant='h4' className='gradient-text w-full' component="div">
                    {title}
                </Typography>
                <Typography variant='body1' className='' component="div" sx={{color: grey[50]}}>
                    {description}
                </Typography>
            </div>
        </Box>
    </motion.div>
  )
}

export default Collection