import { Button, Typography } from '@mui/material'
import React from 'react'

const FeaturedCardTitle = ({title, handleNavigate}) => {
    return (
        
        <Button  onClick={(e)=> {handleNavigate(e)}} >
            <Typography variant='h3' className='gradient-text-category  w-full text-left truncate-title' sx={{fontSize: "1.25rem", width: "100%"}}>
                {title}
            </Typography>                    
        </Button>

    )
}

export default FeaturedCardTitle