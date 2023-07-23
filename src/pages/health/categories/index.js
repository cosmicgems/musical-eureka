import React from 'react'
import Layout from '../../../components/Layout'
import CategoryCard from '../../../components/technology/blog/category/CategoryCard'
import { CardContent, Grid, Stack, Typography } from '@mui/material'
import { blue, grey, lightBlue, green, lightGreen, deepPurple, orange, yellow, } from '@mui/material/colors';
import { useStateContext } from '../../../../Context/StateContext'

const TechCategoriesPage = () => {
  const {pageName, pathSegment, subcategories} = useStateContext();
  const sampleFeaturedPost = [1, 2 ,3, 4, 5, 6, 7, 8, 9,1 ,2 ,3 , 4, 5, 6, 7, 8,];
  const pageSegmentColors = {
      technology: blue[100], // Example color for "tech" segment
      realty: yellow[100],
      health: lightBlue[100],
      intelligence: orange[100],
      community: deepPurple[100],
      finance: green[100]
    };

  const allCategoriesFontColor = pageSegmentColors[pathSegment] || '#000';


  return (


        <div style={{paddingBlockStart: '10vh', paddingInline:'3vh', minHeight:'80vh'}}>
          <Typography variant='h2' component='div' sx={{width: '100%', textAlign:'center', color:allCategoriesFontColor, fontWeight: 'bold'}}>
            Categories
          </Typography>
          <CardContent
            sx={{  width:'100%', display:'flex', overflowX: 'auto', overflowY:'hidden', position: 'absolute', paddingInline: 0, overflowWrap: 'unset'}}>
            

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