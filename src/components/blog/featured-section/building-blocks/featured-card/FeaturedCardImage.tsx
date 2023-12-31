import { CardMedia } from '@mui/material'
import React from 'react'

const FeaturedCardImage = ({
    photo, 
    desc,
}) => {
    return (
        <div>
            
            <CardMedia 
                component="img"
                image={``}
                alt={desc}
                sx={
                    {
                        objectFit: "cover", 
                        borderTopRightRadius: "5px", 
                        borderTopLeftRadius: "5px"
                    }
                }
                className=''
                />

        </div>
    )
}

export default FeaturedCardImage