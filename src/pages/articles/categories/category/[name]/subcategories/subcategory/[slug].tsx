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

const fetchCategoryDataForPaths = async () => {
  try {
    const response = await axios.get(`${DOMAIN}/api/blog/category/get-all-slugs`);
    return response.data.categories;
  } catch (error) {
    console.error('Error fetching category data:', error);
    return [];
  }
};

export const getStaticPaths = async () => {
  const categories = await fetchCategoryDataForPaths();

  const paths = [];

  categories.forEach((category) => {
    const subcategoriesData = category.sub_categories.map((subcategory) => ({
      name: category.slug,
      slug: subcategory.name,
    }));
    subcategoriesData.map((p) => {
      paths.push({ params: { name: p.name, slug: p.slug } });
    });
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  // Fetch data for the given slug during build time
  try {
    const response = await axios.get(`${DOMAIN}/api/blog/subcategory/${slug}`);
    const sub_category = response.data.sub_category;
    return {
      props: sub_category,
    };
  } catch (error) {
    console.error(`Error fetching data for slug ${slug}:`, error);
    return {
      props: {}, // Return empty props or handle the error as needed
    };
  }
};

//checkout somethung
