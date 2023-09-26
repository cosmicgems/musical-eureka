import axios from 'axios';
import React from 'react'
import { API, DOMAIN, APP_NAME } from "../../../../../../../../config";
import connectDB from '../../../../../../../../lib/connectDB';
import SubCategory from '../../../../../../../../lib/models/sub_category';
import Category from '../../../../../../../../lib/models/category';

const SubcategorySlugPage = ({sub_category}) => {

  
  
  console.log(sub_category);
  
    return (
        <div>{sub_category.name}</div>
    )
}

export default SubcategorySlugPage



export const getStaticPaths = async () => {
  try {
    await connectDB();

    // Fetch categories and their sub-categories in parallel
    const [categories, subcategories] = await Promise.all([
      Category.find({}).populate("sub_categories"),
      SubCategory.find({}),
    ]);

    const paths = [];

    categories.forEach((category) => {
      const subcategoriesData = category.sub_categories.map((subcategory) => ({
        name: category.slug,
        slug: subcategory.slug,
      }));

      subcategoriesData.forEach((p) => {
        paths.push({ params: { name: p.name, slug: p.slug } });
      });
    });

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error(error);
  }
};

export const getStaticProps = async ({ params: { slug } }) => {
  // Fetch data for the given slug during build time
  try {
    await connectDB();
    const sub_category = await SubCategory.findOne({slug});

    
    console.log(sub_category);
    
    return {
      props: {sub_category: JSON.parse(JSON.stringify(sub_category))},
    };
  } catch (error) {
    console.error(`Error fetching data for slug ${slug}:`, error);
    return {
      props: {sub_category: null}, 
    };
  }
};


