import { Avatar, Button, Tooltip, Typography } from '@mui/material'
import React from 'react'
import Fade from '@mui/material/Fade';

const App = ({data}) => {
  return (
    <div className='flex flex-col gap-1 w-[100px] md:w-[150px]'>
        <Tooltip TransitionComponent={Fade} 
        TransitionProps={{ timeout: 600 }}
        title={data.description}>
            <Button href={data.href}>
                <Avatar variant='square' sx={{height: {xs:"100px", md:"150px"}, width: {xs:"100px", md:"150px"}, borderRadius: "5px"}} src={data.icon}/>
            </Button>
        </Tooltip>
        <Tooltip TransitionComponent={Fade} 
        TransitionProps={{ timeout: 600 }}
        title={data.description}>
            <Button href={data.href}>
                <Typography variant='caption' className='gradient-text-category text-center' sx={{}}>
                    {data.name}
                </Typography>            
            </Button>            
        </Tooltip>



    </div>
  )
}

export default App