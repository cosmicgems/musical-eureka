import axios from 'axios';
import React from 'react'

const SubcategorySlugPage = ({_id:id, name, slug, description, photo_landscape: p_wide, photo_portrait: p_long}) => {
    return (
        <div>{name}</div>
    )
}

export default SubcategorySlugPage



export const getStaticPaths = async () => {
  const subcategories = await axios.get("http://localhost:3000/api/blog/subcategory/get-all-slugs");
  const subcategory_slugs = subcategories.data.sub_categories.map((subcategory) => ({
    slug: subcategory.slug,
    name: subcategory.name,
    categorySlug: subcategory.categorySlug,
  }));

  const categories = await axios.get("http://localhost:3000/api/blog/category/get-all-slugs");
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
export const getStaticProps = async ({ params: { slug } }) => {
    const res = await axios.get(`http://localhost:3000/api/blog/subcategory/${slug}`)
    const sub_category = res.data.sub_category;
    return {
        props: sub_category,
    };
};