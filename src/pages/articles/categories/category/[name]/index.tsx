import React from 'react'
import axios from 'axios'

const SlugCategoryPage = ({_id:id, name, slug, sub_categories, description, photo_landscape: p_wide, photo_portrait: p_long}) => {
  return (
    <div>{name}</div>
  )
}

export default SlugCategoryPage

export const getStaticPaths = async () => {
  const categories = await axios.get("http://localhost:3000/api/blog/category/get-all-slugs");
  const category_slugs = categories.data.categories
  const slugs = category_slugs.map((a)=> a.slug);
  const paths = slugs.map((name) => ({
      params: { name },
  }));
  console.log(paths);
  
return {
  paths,
  fallback: 'blocking',
};
};

export const getStaticProps = async ({ params: { name } }) => {
const res = await axios.get(`http://localhost:3000/api/blog/category/${name}`)
const category = res.data.category;
return {
  props: category,
};
};