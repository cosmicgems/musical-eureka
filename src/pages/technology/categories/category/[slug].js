import { useRouter } from 'next/router';
import { getArticlesBySubcategory, getSubcategories, getSubcategoryBySlug } from '../../../../../sanity/query functions/query';
import { Button, CardContent, Grid, Typography } from '@mui/material';
import MainArticleCard from '../../../../components/technology/blog/all-blogs/MainArticleCard';

// ... import other components as needed

function SlugPage({ articles, subcategorySlug, name }) {
  // console.log(subcategory);
  return(
    <>
    <div style={{ paddingBlockStart: '10vh', width:'100%' }}>
      <Grid container spacing={{ xs: 0, md: 2 }}>
        <Typography component='div' variant='h2' sx={{width: '100%', textAlign: 'center'}}>
          {name}
        </Typography>

        <Grid item xs={12} sx={{}}>
          <CardContent sx={{ marginBlockEnd: { lg: '4vh' }, paddingInline: { xs: '0', lg: '17.5vw' } }}>
            {articles?.map((article) => {
              return <MainArticleCard key={article._id} article={article} />;
            })}
          </CardContent>

          <Grid item sx={{ paddingInline: { xs: '17.5%', lg: '33.3%' } }}>
            <div style={{ width: '100%' }}>
              <Button type="button" variant="outlined" sx={{ width: '100%' }} size="large">
                Load More **Need Logic**
              </Button>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
    </>
  )
}

export async function getStaticProps({ params }) {
  const { slug: subcategorySlug} = params;
  // console.log(subcategorySlug, "what about now?");
  const articles = await getArticlesBySubcategory(subcategorySlug);
  // console.log(articles, "this it?");
  const subcategory = await getSubcategoryBySlug(subcategorySlug);
  console.log(subcategory, "this how I know");
  const {name} = subcategory;

  return {
    props: {articles, name},
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
    fallback: false, // or "blocking" if you want to enable fallback behavior
  };
}

export default SlugPage;
