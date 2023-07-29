import { useRouter } from 'next/router';
import { getArticlesBySubcategory, getSubcategories, getSubcategoryBySlug } from '../../../../../sanity/query functions/query';
import { Button, CardContent, Grid, Typography } from '@mui/material';
import MainArticleCard from '../../../../components/technology/blog/all-blogs/MainArticleCard';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { blue, grey, lightBlue, green, lightGreen, deepPurple, orange, yellow, } from '@mui/material/colors';
import { useStateContext } from '../../../../../Context/StateContext';
import Layout from '../../../../components/Layout';
// ... import other components as needed

function SlugPage({ articles, slug, name, totalCount }) {
  const {pathSegment} = useStateContext();
  const pageSegmentColors = {
    technology: blue[100], // Example color for "tech" segment
    realty: yellow[100],
    health: lightBlue[100],
    intelligence: orange[100],
    community: deepPurple[100],
    finance: green[100]
  };

  const indexFontColor = pageSegmentColors[pathSegment] || '#000';

  const [loadedCount, setLoadedCount] = useState(2); 
  const [loadedArticleData, setLoadedArticleData] = useState(articles); 

  const loadInitialArticles = useCallback(async () => {
    const initialArticles = await getArticlesBySubcategory("technology",slug, 0, loadedCount); 
    setLoadedArticleData(initialArticles.articles);
    setLoadedCount(initialArticles.totalCount);
  }, [loadedCount, slug]);

  useEffect(() => {
    
    loadInitialArticles();
  }, [loadInitialArticles]);

  const handleLoadMore = async () => {
    const skip = loadedArticleData.length; 
    const limit = 2; 

    
    const additionalArticles = await getArticlesBySubcategory("technology",slug, skip, limit);

    
    setLoadedArticleData((prevArticles) => [...prevArticles, ...additionalArticles.articles]);

    
    if (additionalArticles.totalCount === loadedArticleData.length) {
      setLoadedCount(0);
    } else {
      
      setLoadedCount(loadedCount + limit);
    }
  };
  const showLoadMoreButton = loadedCount < totalCount;
  
  return(
    <>
    <Layout>
      <div style={{ paddingBlockStart: '10vh', width:'100%' }}>
            <Grid container spacing={{ xs: 0, md: 2 }}>
              <Typography component='div' variant='h2' sx={{width: '100%', textAlign: 'center', color:indexFontColor}}>
                {name}
              </Typography>

              <Grid item xs={12} sx={{}}>
                <CardContent sx={{ marginBlockEnd: { lg: '4vh' }, paddingInline: { xs: '0', lg: '17.5vw' } }}>
                  {loadedArticleData && loadedArticleData.length > 0 ? (
                      loadedArticleData.map((article) => {
                        return <MainArticleCard key={article._id} article={article} />;
                      })
                    ) : (
                      <Typography>No articles to display.</Typography>
                    )}
                </CardContent>

                <Grid item sx={{ paddingInline: { xs: '17.5%', lg: '33.3%' } }}>
                  <div style={{ width: '100%' }}>
                  {showLoadMoreButton && (
                <Button
                  type="button"
                  variant="outlined"
                  sx={{ width: '100%' }}
                  size="large"
                  onClick={handleLoadMore}
                >
                  Load More
                </Button>
              )}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </div>
    </Layout>
    
    </>
  )
}

export async function getStaticProps({ params }) {
  const { slug} = params;
  const {articles, totalCount} = await getArticlesBySubcategory("technology",slug);
  // console.log(articles, "this it?");
  const subcategory = await getSubcategoryBySlug(slug);
  console.log(subcategory, "this how I know");
  const {name} = subcategory;

  return {
    props: {articles, name, slug, totalCount},
  };
}

export async function getStaticPaths() {
  const subcategories = await getSubcategories();
  
  const paths = subcategories.map((subcategory) => ({
    params: {
      subcategorySlug: subcategory.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking", // or "blocking" if you want to enable fallback behavior
  };
}

export default SlugPage;
