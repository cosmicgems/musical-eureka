import axios from 'axios';
import React from 'react'
import { API, DOMAIN, APP_NAME } from "../../../../../../../../config";
import connectDB from '../../../../../../../../lib/connectDB';
import SubCategory from '../../../../../../../../lib/models/sub_category';
import Category from '../../../../../../../../lib/models/category';

const SubcategorySlugPage = ({sub_category}) => {

  const sc = sub_category[0]
  const {name, slug, description, photo_landscape: p_wide, photo_portrait: p_long,} = sc;
    return (
        <div>{name}</div>
    )
}

export default SubcategorySlugPage

//New commit needed

// const fetchCategoryDataForPaths = async () => {
//   try {
//     const response = await axios.get(`${API}/api/blog/category/get-all-slugs`);
//     return response.data.categories;
//   } catch (error) {
//     console.error('Error fetching category data:', error);
//     return [];
//   }
// };

export const getStaticPaths = async () => {

  try {
    await connectDB();
    await SubCategory.find({});

    const cats = await Category.find({})
                              .populate("sub_categories");
    const paths = [];

    cats.forEach((category) => {
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

  } catch (error) {
    console.error(error)
  }
  
};

export const getStaticProps = async ({ params: { slug } }) => {
  // Fetch data for the given slug during build time
  try {
    await connectDB();
    const sub_category = await SubCategory.find({slug});

    // console.log(sub_category);
    
    return {
      props: {sub_category: JSON.parse(JSON.stringify(sub_category))},
    };
  } catch (error) {
    console.error(`Error fetching data for slug ${slug}:`, error);
    return {
      props: {}, // Return empty props or handle the error as needed
    };
  }
};

//checkout somethung
