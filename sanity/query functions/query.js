import { client } from '../lib/client.js'; // Replace with your Sanity client initialization
import { groq } from 'next-sanity';

// Fetch articles from Sanity
export async function getArticles(skip = 0, limit = 1) {
  const query = groq`
    *[_type == "article"] | order(_createdAt desc) [${skip}...${skip + limit}]{
      title,
      body,
      excerpt,
      createdAt,
      slug,
      metaTitle,
      metaDescription,
      image,
      postedBy-> {
        // Subquery to fetch and populate fields from the referenced "postedBy" document
        _id,
        username,
        email,
        image,
      }
    }
  `;

  // Fetch the articles from Sanity with the 'skip' and 'limit' parameters
  const articles = await client.fetch(query);
  return articles;
}



export async function getArticlesByPathSegment(pathSegment, skip, limit=2) {
  
  // Fetch the category that matches the provided pathSegment (converted to lowercase)
  const categoryQuery = `*[_type == "category" && (slug.current) == "${pathSegment}"]{
    _id
  }`;

  // Fetch the matching category from Sanity
  const category = await client.fetch(categoryQuery);

  // If no matching category is found, return an empty array (no articles to retrieve)
  if (category.length === 0) {
    return [];
  }

  // Extract the category ID from the matched category
  const categoryId = category[0]._id;

  // Fetch articles that reference the matched category ID, with skip and limit applied
  const articlesQuery = `*[_type == "article" && references($categoryId)] | order(_createdAt desc) [${skip}...${skip + limit}] {
    // Add the fields you want to retrieve for each article
    title,
    body,
    excerpt,
    createdAt,
    slug,
    metaTitle,
    metaDescription,
    image,
    postedBy-> {
      // Subquery to fetch and populate fields from the referenced "postedBy" document
      _id,
      username,
      email,
      image,
    }
  }`;

  // Define the parameter object that includes the 'categoryId' variable
  const params = { categoryId };

  // Fetch the articles from Sanity with the 'params' parameter
  const articles = await client.fetch(articlesQuery, params);
  return articles;
}

export async function getFeaturedArticlesByPathSegment(pathSegment, skip, limit = 2) {
  // Fetch the category that matches the provided pathSegment (converted to lowercase)
  const categoryQuery = `*[_type == "category" && slug.current == "${pathSegment}"]{
    _id
  }`;

  // Fetch the matching category from Sanity
  const category = await client.fetch(categoryQuery);

  // If no matching category is found, return an empty array (no articles to retrieve)
  if (category.length === 0) {
    return [];
  }

  // Extract the category ID from the matched category
  const categoryId = category[0]._id;

  // Fetch articles that reference the matched category ID, with skip and limit applied
  const articlesQuery = `*[_type == "article" && references($categoryId)  && references($featuredTagId) ] | order(_createdAt desc) [${skip}...${skip + limit}] {
    // Add the fields you want to retrieve for each article
    title,
    body,
    excerpt,
    createdAt,
    slug,
    metaTitle,
    metaDescription,
    image,
    postedBy-> {
      // Subquery to fetch and populate fields from the referenced "postedBy" document
      _id,
      username,
      email,
      image,
    }
  }`;

  // Fetch the ID of the "Featured" tag
  const tagQuery = '*[_type == "tag" && name == "Featured"]{_id}';
  const tag = await client.fetch(tagQuery);
  const featuredTagId = tag[0]._id;
  console.log(featuredTagId, "***************");
  // Define the parameter object that includes the 'categoryId' and 'featuredTagId' variables
  const params = { categoryId, featuredTagId};

  // Fetch the articles from Sanity with the 'params' parameter
  const articles = await client.fetch(articlesQuery, params);
  console.log(articles);
  return articles;
}



export async function getAllArticles(pathSegment, skip = 0, limit = 5) {

  // Fetch the categories that match the provided pageSegment (converted to lowercase)
  const categoriesQuery = groq`
    *[_type == "category" && lowercase(name) == "${pathSegment.toLowerCase()}"] {
      _id
    }
  `;

  // Fetch the matching categories from Sanity
  const categories = await client.fetch(categoriesQuery);

  // Extract the category IDs from the matched categories
  const categoryIds = categories.map((category) => category._id);

  // If no matching categories are found, return an empty array
  if (categoryIds.length === 0) {
    return [];
  }

  // Fetch articles that belong to the matched categories, ordered by _createdAt in descending order
  const query = groq`
    *[_type == "article" && references($categoryIds)] | order(_createdAt desc) [${skip}...${skip + limit}]{
      title,
      body,
      excerpt,
      createdAt,
      slug,
      metaTitle,
      metaDescription,
      image,
      postedBy-> {
        // Subquery to fetch and populate fields from the referenced "postedBy" document
        _id,
        username,
        email,
        image,
      }
    }
  `;

  // Define the parameter object that includes the 'categoryIds' variable
  const params = { categoryIds };

  // Fetch the articles from Sanity with the 'skip', 'limit', and 'params' parameters
  const articles = await client.fetch(query, params);
  return articles;
}



export async function getArticlesBySubcategory(subcategorySlug, skip = 0, limit = 5) {
  // Fetch subcategories to get their IDs
  const subcategoryQuery = groq`
    *[_type == "subcategory" && slug.current == $subcategorySlug] {
      _id
    }[0]
  `;
  const subcategory = await client.fetch(subcategoryQuery, { subcategorySlug });

  // If the subcategory is not found, return an empty array
  if (!subcategory) {
    return { articles: [], totalCount: 0 };
  }

  const subcategoryId = subcategory._id;

  // Query articles based on the subcategory ID, with skip and limit applied
  const articlesQuery = groq`
    *[_type == "article" && references($subcategoryId)] {
      title,
      body,
      excerpt,
      createdAt,
      slug,
      metaTitle,
      metaDescription,
      image,
      postedBy->{
        _id,
        username,
        email,
        image,
      }
    }
  `;

  // Query all articles that match the subcategory ID (without applying skip and limit)
  const allArticlesQuery = groq`
    *[_type == "article" && references($subcategoryId)] {
      _id
    }
  `;

  // Execute both queries in parallel using Promise.all
  const [articles, allArticles] = await Promise.all([
    client.fetch(articlesQuery, { subcategoryId, skip, limit }),
    client.fetch(allArticlesQuery, { subcategoryId }),
  ]);

  const totalCount = allArticles.length; // Get the total count of articles

  return { articles, totalCount };
}




export async function getCategories() {
  const query = groq`
    *[_type == "category"]{
      name,
      image,
      about,
      "subcategories": subcategories[]-> {
        name,
        slug,
        photo
      }
    }
  `;

  const categories = await client.fetch(query);
  return categories;
}



export async function getSubcategoryBySlug(slug) {
  console.log(slug);
  const query = groq`*[_type == 'subcategory' && slug.current == $slug]{
    name
  }[0]`;

  // const params = { slug };
  // console.log("Params:", params);
    const subcategory = await client.fetch(query, {slug});
    return subcategory;
  
}



export async function getSubcategories() {
  const query = groq`
    *[_type == "subcategories"]{
      name,
      photo,
      slug,
      
    }
  `;
  const subcategories = await client.fetch(query);
  return subcategories;
}






export async function getTags() {
  const query = `*[_type == "tag"]`;
  const tags = await client.fetch(query);
  return tags;
}



export async function getUsers() {
  const query = `*[_type == "user"]`;
  const users = await client.fetch(query);
  return users;
}
