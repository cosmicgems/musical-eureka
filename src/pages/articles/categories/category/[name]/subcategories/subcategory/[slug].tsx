import axios from 'axios';
import React from 'react'
import { API, DOMAIN, APP_NAME } from "../../../../../../../../config";

const SubcategorySlugPage = ({_id:id, name, slug, description, photo_landscape: p_wide, photo_portrait: p_long}) => {
    return (
        <div>{name}</div>
    )
}

export default SubcategorySlugPage

//New commit needed

export const getStaticPaths = async () => {
<<<<<<< HEAD
=======
  const subcategories = await axios.get(`${DOMAIN}/api/blog/subcategory/get-all-slugs`);
  const subcategory_slugs = subcategories.data.sub_categories.map((subcategory) => ({
    slug: subcategory.slug,
    name: subcategory.name,
    categorySlug: subcategory.categorySlug,
  }));
>>>>>>> e38e9b5648c34f7edbe9eb7747bb49a25bb6f9e6

  const categories = await axios.get(`${DOMAIN}/api/blog/category/get-all-slugs`);
  const paths = [];

  // Generate paths for category pages
  categories.data.categories.forEach((category) => {
    const subcategoriesData = category.sub_categories.map((subcategory) => ({
      name: category.slug,
      slug: subcategory.name,
    }
    
    ));
    subcategoriesData.map((p) => {
      paths.push({params: {name: p.name, slug: p.slug}});
    })
    

    
  });

  console.log(paths);

  return {
    paths,
    fallback: 'blocking',
  };
};
<<<<<<< HEAD


=======
>>>>>>> e38e9b5648c34f7edbe9eb7747bb49a25bb6f9e6
export const getStaticProps = async ({ params: { slug } }) => {
    const res = await axios.get(`${DOMAIN}/api/blog/subcategory/${slug}`)
    const sub_category = res.data.sub_category;
    return {
        props: sub_category,
    };
<<<<<<< HEAD
};

//checkout somethung
=======
};
>>>>>>> e38e9b5648c34f7edbe9eb7747bb49a25bb6f9e6
