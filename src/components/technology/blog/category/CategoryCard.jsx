import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { blue, deepOrange, red } from '@mui/material/colors'
import Link from 'next/link'
import React from 'react'
import { useStateContext } from '../../../../../Context/StateContext'

const CategoryCard = ({category: {name, photo:{image, url}, slug:{current:slug}}}) => {
  const {pageName, pageSlug, pathSegment, showCart, setShowCart, totalQuantities, subcategories } = useStateContext();

  return (
    <div>
      <Link href={`/${pathSegment}/categories/category/${slug}`}>
        <Card >            
        <CardContent sx={{position: 'absolute', width: {xs:"85vw",md:'34vw'} }} >
                <Typography variant='h5' component='div' sx={{color:blue[600],  width:{xs: '70vw', lg: '31vw',}, textShadow: '2px 2px #EEE', fontSize: {md: "3rem"}, fontWeight: 'bold', marginBlockStart: '12vh'}}>
                    {name}
                </Typography>
            </CardContent>
            <CardMedia
                id='tech'
                sx={{ height: {xs: '33vh', lg: '34vh'},  objectFit: 'cover',  }}
                image={url && url}
                title="pearl-box-tech"
            />

        </Card>
      </Link>

    </div>
  )
}

export default CategoryCard