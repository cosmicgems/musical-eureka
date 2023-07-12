import React from 'react'
import Layout from '../../components/Layout'
import { useStateContext } from '../../../Context/StateContext'
import { Box, Button, CardContent, Grid, Stack, Typography } from '@mui/material';
import FeaturedArticle from '../../components/technology/blog/FeaturedArticle';
import CategoryCard from '../../components/technology/blog/CategoryCard';
import CategoryCardMobile from '../../components/technology/blog/all-blogs/CategoryCardMobile';
import RecentArticle from '../../components/technology/blog/RecentArticle';
import { getArticles, getCategories, getSubcategories, getTags, getUsers } from '../../../sanity/query functions/query';


const TechnologyHome = ({  categories, articles, tags, users }) => {
    console.log(articles);
    const sampleFeaturedPost = [1, 2 ,3, 4, 5, 6, 7, 8, 9];
    const {pageName, subcategories} = useStateContext();
    const pageTitle = pageName.slice(1);

    
    console.log(subcategories);

    return (
        <Box sx={{paddingBlockStart: {xs: '5vh', sm: '4vh', md: '7vh', lg: '8vh', xl: '10vh'}}}>
            <Grid container spacing={{xs:1,md:2}}  >

                <Typography component='div' variant='h2' sx={{width: '100%', textAlign: 'center', fontSize: {xs: '2em'}, marginBlockEnd:{xs:'2vh'}}}>
                    Pearl Box <span className='pageTitle'>{pageTitle.toUpperCase()}</span> 
                </Typography>

                <Grid item sx={{display: {xs: 'none', lg:'initial'}}} lg={2}>
                    <div style={{padding: '2vh'}}>
                        {subcategories?.map((category) => {
                            return <CategoryCard key={category._id} category={category} />
                        })}                       
                    </div>

                </Grid>

                <Grid item lg={10} sx={{}}>

                    <CardContent sx={{display: {sm: 'flex'}, flexDirection: {sm:'row'}, overflowX: {sm: 'scroll'}, marginBlockEnd: {xs: '5vh', sm:'4vh'},padding:{xs: 0}, }} >

                            {articles?.map((article) =>{ 
                                {/* console.log(article) */}
                                return <FeaturedArticle key={article._id} article={article}  />
                                 }
                            )}

                    </CardContent>


                    <Grid item sx={{}}>
                        <Typography variant='h4' component='div' sx={{width: '100%', textAlign: 'center', marginBlockEnd: {xs: '2vh',lg: '2vh'}, fontSize: {xs: '2em'}}}>
                            Recent <span>{pageTitle.toUpperCase()}</span> Articles
                        </Typography>

                        <Grid container sx={{ marginBlockEnd: {lg:'4vh'}}} spacing={12} >
                                {articles?.map((article) => {
                            
                                    return <Grid item  key={article._id + 'recent_article'}  lg={4}><RecentArticle RecentArticle={article} />                                
                            </Grid>
                                })}

                                <Grid item xs={12}>
                                    <div style={{width: '100%',paddingInline: '33.3%'}}>
                                        <Button type='button' variant='outlined' sx={{width: '100%'}} size='large'>
                                            Load More **Need Logic**
                                        </Button>
                                    </div>
                                </Grid>



                        </Grid>

                    </Grid>
                    
                </Grid>

                <Grid item sx={{display: {lg:'none'}}}>
                        <CardContent  sx={{display: {xs: 'flex', lg: 'none'},  overflowX: 'auto', }}>
                                {subcategories?.map((category) => {
                                    return <CategoryCardMobile key={category._id} category={category} />  
                                })}
                        </CardContent>  
                </Grid>
                
            </Grid>         
        </Box>

    )
}




export async function getServerSideProps() {
    try {
      const subcategories = await getSubcategories(); 
      const categories = await getCategories();
      const articles = await getArticles();

  
      return {
        props: {
            subcategories,
            categories,
            articles,
        },
      };
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      return {
        props: {
          subcategories: [],
          categories: [],
          articles: [],
        },
      };
    }
}


export default TechnologyHome