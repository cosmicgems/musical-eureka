import { Avatar, Button, Tooltip, Typography } from '@mui/material'
import React from 'react'
import Fade from '@mui/material/Fade';
import { motion } from 'framer-motion'

const CoreValue = ({c, onTap}) => {

    const handleClick = (c) => {
        onTap(c);
    }

  return (
    <div className='flex flex-col gap-1 w-[100px] md:w-[150px]'>
        {/* <Tooltip TransitionComponent={Fade} 
        TransitionProps={{ timeout: 600 }}
        title={c.description}> */}
            <motion.div
            whileHover={{scale: 1.1 }}
            whileTap={{ scale: 0.9 }}>
                <Button onClick={() => {handleClick(c)}} >
                    <Avatar variant='square' sx={{height: {xs:"100px", md:"150px"}, width: {xs:"100px", md:"150px"}, borderRadius: "5px", boxShadow: "5px 5px 5px #000"}} src={c.icon}/>
                </Button>

        {/* </Tooltip>
        <Tooltip TransitionComponent={Fade} 
        TransitionProps={{ timeout: 600 }}
        title={c.description}> */}
                <Button fullWidth onClick={() => {handleClick(c)}} >
                    <Typography variant='body1' className='gradient-text text-center' sx={{}}>
                        {c.name}
                    </Typography>            
                </Button>                      
            </motion.div>
      
        {/* </Tooltip> */}



    </div>
  )
}

export default CoreValue