import React from 'react'
import Layout from '../../../components/Layout'
import { Button, CardContent, Grid, Stack, Typography } from '@mui/material'
import FeaturedArticle from '../../../components/technology/blog/FeaturedArticle'
import { useStateContext } from '../../../../Context/StateContext'
import RecentArticle from '../../../components/technology/blog/RecentArticle'
import CategoryCardMobile from '../../../components/technology/blog/all-blogs/CategoryCardMobile'
import MainArticleCard from '../../../components/technology/blog/all-blogs/MainArticleCard'
import { getArticles } from '../../../../sanity/query functions/query'

const TechnologyArticles = ({articles}) => {
    const sampleFeaturedPost = [1, 2 ,3, 4, 5, 6, 7, 8, 9];
    const {pageName, subcategories} = useStateContext();
    console.log(pageName);
    const pageTitle = pageName.slice(1);
    
  return (
    <div  style={{paddingBlockStart: '10vh', }}>
            <Grid container spacing={{xs:0,md:2}}  >


                
                <div style={{}}>
                    <div className='maylike-products-wrapper track'>
                            <div className='marquee '  >
                                
                                    <div className='maylike-products-container' >
                                        {subcategories?.map((category) => {
                                            return <CategoryCardMobile key={category._id} category={category} />
                                        })}                                       
                                    </div>
                        
                                
                            </div>
                    </div>                    
                </div>




                <Grid item xs={12} sx={{}}>

                    <CardContent sx={{ marginBlockEnd: {lg:'4vh'}, paddingInline: {xs: '0', lg:'17.5vw'}}} >

                            {articles?.map((article) => {
                                return <MainArticleCard key={article._id} article={article} />
                            })}

                    </CardContent>


                    <Grid item sx={{paddingInline: {xs:'17.5%', lg: '33.3%'}}}>
                        
                                    <div style={{width: '100%',}}>
                                        <Button type='button' variant='outlined' sx={{width: '100%'}} size='large'>
                                            Load More **Need Logic**
                                        </Button>
                                    </div>

                    </Grid>
                    
                </Grid>


                
            </Grid>  
      </div>
  )
}


export async function getServerSideProps() {
    try {
        const articles = await getArticles();

  
        return {
            props: {
                articles,
            },
        };
        } catch (error) {
        console.error('Error fetching subcategories:', error);
        return {
            props: {
            articles: [],
            },
        };
        }
}

export default TechnologyArticles