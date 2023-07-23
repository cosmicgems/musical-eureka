import React from 'react'
import Layout from '../../../components/Layout'
import CategoryCard from '../../../components/technology/blog/category/CategoryCard'
import { CardContent, Grid, Stack, Typography } from '@mui/material'
import { deepOrange, grey, red } from '@mui/material/colors'
import { useStateContext } from '../../../../Context/StateContext'

const TechCategoriesPage = () => {
  const {pageName, pathSegment, subcategories} = useStateContext();
  const sampleFeaturedPost = [1, 2 ,3, 4, 5, 6, 7, 8, 9,1 ,2 ,3 , 4, 5, 6, 7, 8,];


  return (


        <div style={{paddingBlockStart: '10vh', paddingInline:'3vh', minHeight:'80vh'}}>
          <Typography variant='h2' component='div' sx={{width: '100%', textAlign:'center', color:grey[50], fontWeight: 'bold'}}>
            Categories
          </Typography>
          <CardContent
            sx={{  width:'100%', display:'flex', overflowX: 'auto', overflowY:'hidden', position: 'relative', paddingInline: 0, overflowWrap: 'unset'}}>
            

                <Stack direction='row' justifyContent="center" alignItems='center' style={{display:'flex', textAlign:'center', paddingInline: 0}}>
            {subcategories?.map((category) => {
              return <CardContent key={category._id} sx={{width: {xs:'85vw', md:'34vw'}}} >
                <CategoryCard category={category}/>  
              </CardContent>
                           
           
            })}
            </Stack>
            </CardContent>
          
         
        </div>

  

  )
}

export default TechCategoriesPage