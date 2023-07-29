import React, {useEffect} from 'react';
import { Avatar, Box, Card, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import moment from 'moment/moment';
import { urlFor } from '../../../../lib/client';
import { client } from '../../../../sanity/lib/client';
import { lightBlue } from '@mui/material/colors';
import { getArticlesBySubcategory } from '../../../../sanity/query functions/query';
import Layout from '../../../components/Layout'
import Head from 'next/head';

const RelatedArticle = dynamic(() => import('../../../components/technology/blog/RelatedArticle'));

const DynamicArticlePage = ({ article, related }) => {
  const [ogImageUrl, setOgImageUrl] = useState(null);
  const { title, body, createdAt, excerpt, image, lastUpdated, metaDescription, metaTitle, postedBy: { image: userImage, username }, slug: { current: slug }, _createdAt, _id, _updatedAt } = article;
  const head = () => {
      <Head>
          <title>Pearl Box</title>
          <meta property='og:image' content={ ogImageUrl} />
          <meta property='og:title' content="Pearl Box" />
        </Head>
  }
  
  useEffect(() => {
    const fetchOgImageUrl = async () => {
      const imageUrl = await getOgImageUrl(ogTitle, ogDescription, );
      setOgImageUrl(imageUrl);
    };

    fetchOgImageUrl();
  }, [ogTitle, ogDescription]);

  if (!ogImageUrl) {
    // Return a loading state or a placeholder while ogImageUrl is being fetched
    return <div>Loading...</div>;
  }

  return (
   <Layout ogTitle={title} ogDescription={excerpt} ogImage={image}  >
    {head()}
    <Card elevation={0} sx={{}}>
      <Box sx={{ position: 'absolute', marginBlockStart: { xs: '37.5vh', sm: '40vh' }, zIndex: 3, width: '100%' }}>
        <Typography sx={{ fontSize: { xs: '2rem' }, fontWeight: 'bold', color: lightBlue[100], width: '100%', textAlign: 'center' }} variant="h6" component="div">
          {title}
        </Typography>
      </Box>
      <CardContent sx={{ height: '45vh', padding: 0, position: 'relative' }}>
        <CardMedia
          title={title && title}
          sx={{ objectFit: 'cover', width: '100%', height: '45vh' }}
          id={slug && slug}
          image={image && image}
        />
      </CardContent>
      <Box sx={{ width: '100%', paddingInline: { xs: '6vw', sm: '17.5vw' }, paddingBlockStart: '3vh' }}>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ marginBlock: '2vh' }}>
            <Avatar alt="Remy Sharp" src={urlFor(userImage && userImage[0])} sx={{ width: '7vh', height: '7vh' }} />
            <Box sx={{ width: '100%' }}>
              <Typography variant="p" component="div" sx={{}}>
                Posted By: <span className="featuredCard">{username}</span>
              </Typography>
              <Typography variant="p" component="div" sx={{}}>
                Date: <span className="postDate">{moment(createdAt).fromNow()}</span>
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Typography variant="paragraph" component="div" sx={{ width: '100%' }}>
          {body}
        </Typography>
      </Box>

      <Box sx={{ width: '100%', marginBlock: '4vh 1vh' }}>
        <Typography variant="h5" component="div" sx={{ width: '100%', textAlign: 'center' }}>
          Related Articles
        </Typography>
      </Box>
      <CardContent
        sx={{
          maxWidth: '100%',
          minWidth: '100%',
          display: 'flex',
          overflowX: 'scroll',
          paddingInline: 0,
          overflowWrap: 'unset',
        }}
      >
        {/* <Stack direction="row" justifyContent="center" alignItems="center" style={{ display: 'flex', textAlign: 'center', paddingInline: 0 }}>
          {related.map((relatedArticle, i) => {
            return <CardContent sx={{}} key={i * 99 + 99}><RelatedArticle relatedArticle={relatedArticle} /></CardContent>;
          })}
        </Stack> */}
      </CardContent>
    </Card>    
   </Layout>



  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "article"] {
    slug {
      current
    }
  }`;

  const articles = await client.fetch(query);

  const paths = articles.map((article) => ({
    params: {
      slug: article.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "article" && slug.current == '${slug}'][0]{
    _id,
    image,
    title,
    slug,
    desc,
    body,
    postedBy->{  // Fetch the referenced "user" document for the "postedBy" field
      _id,
      username,
      email,
      image,
    },
    createdAt,
    lastUpdated,
    postClicks,
    postShares,
    saves,
    excerpt,
    excerptMobile,
    metaTitle,
    metaDescription,
    category->,  // Fetch the referenced "category" document for the "category" field
    subcategories[]->{  // Fetch the referenced "subcategory" documents for the "subcategories" field
      _id,
      name,
      slug,
      photo
    },
    tags[]->{  // Fetch the referenced "tag" documents for the "tags" field
      _id,
      name,
      slug
    },
    alternative_photo{
      image,
      url
    }
  }`;

  const article = await client.fetch(query);
  

  const related = await getArticlesBySubcategory(slug);
  console.log(related);
  return {
    props: { article, related },
  };
};

export default DynamicArticlePage;
