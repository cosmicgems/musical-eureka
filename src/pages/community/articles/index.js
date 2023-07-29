import React from 'react';
import { Button, CardContent, Grid, Stack, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { useStateContext } from '../../../../Context/StateContext';
import { getAllArticles, getArticles, getArticlesByPathSegment } from '../../../../sanity/query functions/query';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { blue, grey, lightBlue, green, lightGreen, deepPurple, orange, yellow, cyan, red } from '@mui/material/colors';

const Layout = dynamic(() => import('../../../components/Layout'));
const FeaturedArticle = dynamic(() => import('../../../components/technology/blog/FeaturedArticle'));
const CategoryCardMobile = dynamic(() => import('../../../components/technology/blog/all-blogs/CategoryCardMobile'));
const MainArticleCard = dynamic(() => import('../../../components/technology/blog/all-blogs/MainArticleCard'));
const RecentArticle = dynamic(() => import('../../../components/technology/blog/RecentArticle'));

const CommunityArticles = ({ articles, totalCount }) => {
  const [loadedArticles, setLoadedArticles] = useState(1); // Initialize with initial limit (e.g., 10)
  const [loadedArticleData, setLoadedArticleData] = useState([]); // State to store loaded article data
  console.log(articles);
  const sampleFeaturedPost = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { pageName, subcategories, pathSegment } = useStateContext();
  console.log(pageName);
  const pageTitle = pageName.slice(1);
  
  const loadInitialArticles = useCallback(async () => {
    const initialArticles = await getArticlesByPathSegment('community', 0, loadedArticles);
    
    setLoadedArticleData(initialArticles.articles);
  }, [loadedArticles]);
  
  useEffect(() => {
    // Call the function inside the useEffect callback
    loadInitialArticles();
  }, [loadInitialArticles]);

  
  // Function to load more articles when the "Load More" button is clicked
  const handleLoadMore = async () => {
    const skip = loadedArticleData.length;
    const limit = 5;
    const additionalArticles = await getArticlesByPathSegment('community', skip, limit); // Fetch the next 5 articles (adjust the limit as needed)
    setLoadedArticles((prev) => prev + limit); // Update the number of loaded articles

    // Add the additional articles to the existing loadedArticleData state
    setLoadedArticleData((prevArticles) => [...prevArticles, ...additionalArticles.articles]);
  };

  const showLoadMoreButton = loadedArticles < totalCount;

  const pageSegmentColors = {
    technology: blue[100], // Example color for "tech" segment
    realty: yellow[100],
    health: lightBlue[100],
    intelligence: orange[100],
    community: deepPurple[100],
    finance: green[100], 
    art: cyan[100],
  };

const indexFontColor = pageSegmentColors[pathSegment] || red[100];
  

  return (
    <Layout>
      <div style={{ paddingBlockStart: '10vh' }}>
        <Grid container spacing={{ xs: 0, md: 2 }}>
          <div style={{}}>
            <div className="maylike-products-wrapper track">
              <div className="marquee">
                <div className="maylike-products-container">
                  {subcategories?.map((category) => {
                    return <CategoryCardMobile key={category._id} category={category} />;
                  })}
                </div>
              </div>
            </div>
          </div>

          

          <Grid item xs={12} sx={{}}>
            <CardContent sx={{ marginBlockEnd: { lg: '4vh' }, paddingInline: { xs: '0', lg: '17.5vw' } }}>
                  <Typography variant='h2' component='div' sx={{marginBlockEnd: '5vh', width: '100%', textAlign: 'center', color: indexFontColor, fontWeight: 'bold'}}>
                    All Articles
                  </Typography>
              {loadedArticleData?.map((article) => {
                return <MainArticleCard key={article._id} article={article} />;
              })}
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

  );
};

export async function getStaticProps() {
  try {
    const { articles, totalCount } = await getArticlesByPathSegment('community', 0, 5);

    return {
      props: {
        articles,
        totalCount,
      },
      revalidate: 86400, // Set a revalidation period in seconds (e.g., 24 hours)
    };
  } catch (error) {
    console.error('Error fetching articles:', error);
    return {
      props: {
        articles: [],
        totalCount: 0,
      },
    };
  }
}

export default CommunityArticles;
