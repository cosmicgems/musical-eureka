import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { deepOrange, red } from '@mui/material/colors'
import React from 'react'

const CategoryCard = ({category: {name, image, description}}) => {
  return (
    <div>

        <Card >            <CardContent sx={{position: 'absolute', }} >
                <Typography variant='h5' component='div' sx={{color:red[900],  width:{xs: '100%', lg: '30vw'}}}>
                    {name}
                </Typography>
                <Typography variant='h6' component='div' sx={{color:deepOrange[600], textShadow: '1px 1px #EEE',  width:{xs: '100%', lg: '30vw'}}}>
                  {description}
                </Typography>
            </CardContent>
            <CardMedia
                id='tech'
                sx={{ height: {xs: '33vh', lg: '34vh'},  objectFit: 'cover',  }}
                image="https://images.pexels.com/photos/4816921/pexels-photo-4816921.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                title="pearl-box-tech"
            />

        </Card>
    </div>
  )
}

export default CategoryCard