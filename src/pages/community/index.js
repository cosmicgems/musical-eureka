import React from 'react';
import { useStateContext } from '../../../Context/StateContext';
import { Box, Button, CardContent, Grid, Stack, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useState } from 'react';
import { getArticles, getArticlesByPathSegment } from '../../../sanity/query functions/query';
import { useCallback } from 'react';
import { blue, grey, lightBlue, green, lightGreen, deepPurple, orange, yellow, cyan, red } from '@mui/material/colors';
import Head from 'next/head';

const Layout = dynamic(() => import('../../components/Layout'));
const FeaturedArticle = dynamic(() => import('../../components/technology/blog/FeaturedArticle'));
const CategoryCard = dynamic(() => import('../../components/technology/blog/CategoryCard'));
const CategoryCardMobile = dynamic(() => import('../../components/technology/blog/all-blogs/CategoryCardMobile'));
const RecentArticle = dynamic(() => import('../../components/technology/blog/RecentArticle'));

const CommunityHome = ({ categories, articles, tags, users, totalCount }) => {
  console.log(totalCount);
  const [loadedArticles, setLoadedArticles] = useState(2); // Initialize with initial limit (e.g., 10)
  const [loadedArticleData, setLoadedArticleData] = useState([]); // State to store loaded article data

  
  const { pageName, subcategories, pathSegment } = useStateContext();
  const pageTitle = pageName.slice(1);

  
  
  const loadInitialArticles = useCallback(async () => {
    const initialArticles = await getArticlesByPathSegment("community", 0, loadedArticles); // Pass pathSegment to the getArticles function
    setLoadedArticleData(initialArticles.articles);
  }, [loadedArticles, pathSegment]);
  
  useEffect(() => {
    // Call the function inside the useEffect callback
    loadInitialArticles();
  }, [loadInitialArticles]);

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
  
  
  const handleLoadMore = async () => {
    const skip = loadedArticleData.length;
    const limit = 5;
    const additionalArticles = await getArticlesByPathSegment("community", skip, limit); // Fetch the next 10 articles (adjust the limit as needed)
    setLoadedArticles((prev) => prev + 2); // Update the number of loaded articles

    
    setLoadedArticleData((prevArticles) => [...prevArticles, ...additionalArticles.articles]);
  };
  const showLoadMoreButton = loadedArticles < totalCount;

  return (
    <>
    <Head>
    <title>Pearl Box</title>
    <meta property="og:url" content={`https://pearlbox.co/${pathSegment}`}/>
    <meta property="og:image" content="https://pearlbox.co/api/og-image" />
    <meta property='og:title' content="Pearl Box" />
    </Head>
    <Layout>
      <Box sx={{ paddingBlockStart: { xs: '12vh', sm: '12vh', md: '7vh', lg: '8vh', xl: '10vh' } }}>
        <Grid container>
          <Typography component="div" variant="h2" sx={{ width: '100%', textAlign: 'center', fontSize: { xs: '2em' }, marginBlockEnd: { xs: '2vh' }, fontWeight: 'bold', fontSize: {xs:'4rem',md:'5rem'}, color: indexFontColor  }}>
            Pearl Box <span className="pageTitle">{pageTitle.toUpperCase()}</span>
          </Typography>

          <Grid item sx={{ display: { xs: 'none', lg: 'initial' } }} lg={2}>
            <div style={{ padding: '2vh' }}>
              {subcategories?.map((category) => {
                return <CategoryCard key={category._id} category={category} />;
              })}
            </div>
          </Grid>

          <Grid item lg={10} sx={{}}>
            <CardContent
              sx={{
                display: { sm: 'flex' },
                flexDirection: { sm: 'row' },
                overflowX: { sm: 'auto' },
                marginBlockEnd: { xs: '5vh', sm: '7vh' },
                padding: { xs: 0 },
              }}
            >
              {articles?.map((article) => {
                
                return <FeaturedArticle key={article._id} article={article} />;
              })}
            </CardContent>

            <Grid item sx={{ paddingInlineStart: { sm: '3vw' } }}>
              <Typography
                variant="h4"
                component="div"
                sx={{ width: '100%', textAlign: 'center', marginBlockEnd: { xs: '2vh', lg: '2vh' }, fontSize: { xs: '2em' }, color: indexFontColor, fontWeight: 'bold' }}
              >
                Recent <span>{pageTitle.toUpperCase()}</span> Articles
              </Typography>

              <Grid container sx={{ marginBlockEnd: { lg: '4vh' } }} spacing={5}>
                {loadedArticleData?.map((article, i) => {
                  return (
                    <Grid item key={i + 'recent_article'} sm={6} md={4}>
                      <RecentArticle RecentArticle={article} />
                    </Grid>
                  );
                })}
          
              

                

                <Grid item xs={12}>
                  <div style={{ width: '100%', paddingInline: '33.3%' }}>
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
          </Grid>
        </Grid>
      </Box>      
    </Layout>      
    </>


  );
};

export async function getStaticProps({ params }) {
    console.log({params});
  try {
    
    const [subcategories, categories, articles, tags, users, {totalCount}] = await Promise.all([
      import('../../../sanity/query functions/query').then((module) => module.getSubcategories()),
      import('../../../sanity/query functions/query').then((module) => module.getCategories()),
      import('../../../sanity/query functions/query').then((module) => module.getFeaturedArticlesByPathSegment('community',  0, 2)),
      import('../../../sanity/query functions/query').then((module) => module.getTags()),
      import('../../../sanity/query functions/query').then((module) => module.getUsers()),
      import('../../../sanity/query functions/query').then((module) => module.getArticlesByPathSegment('community',  0, 2)),
    ]);

    return {
      props: { subcategories, categories, articles, tags, users, totalCount },
      revalidate: 86400, // Set a revalidation period in seconds (e.g., 24 hours)
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        subcategories: [],
        categories: [],
        articles: [],
        tags: [],
        users: [],
      },
    };
  }
}

export default CommunityHome;
