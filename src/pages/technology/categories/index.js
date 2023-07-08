import React from 'react'
import Layout from '../../../components/Layout'
import CategoryCard from '../../../components/technology/blog/category/CategoryCard'
import { CardContent, Grid, Typography } from '@mui/material'
import { deepOrange, red } from '@mui/material/colors'
import { useStateContext } from '../../../../Context/StateContext'

const TechCategoriesPage = () => {
  const {pageName, pathSegment, subcategories} = useStateContext();
  const sampleFeaturedPost = [1, 2 ,3, 4, 5, 6, 7, 8, 9,1 ,2 ,3 , 4, 5, 6, 7, 8,];

  return (


        <div style={{paddingBlockStart: '10vh', paddingInline:'3vh'}}>
          <Typography variant='h2' component='div' sx={{width: '100%', textAlign:'center'}}>
            Categories
          </Typography>
          <Grid container spacing={6} sx={{}}>
            {subcategories?.map((category) => {
              return <Grid key={category._id} item xs={12} lg={4}>
              <CategoryCard category={category}/>               
            </Grid>
            })}
            
          </Grid>
         
        </div>

  

  )
}

export default TechCategoriesPage