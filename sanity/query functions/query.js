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

// Fetch articles from Sanity
export async function getAllArticles(skip = 0, limit = 5) {
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


export async function getArticlesBySubcategory(subcategorySlug) {
  // Fetch subcategories to get their IDs
  const subcategoryQuery = groq`
    *[_type == "subcategory" && slug.current == $subcategorySlug] {
      _id
    }[0]
  `;
  const subcategory = await client.fetch(subcategoryQuery, { subcategorySlug });

  // If the subcategory is not found, return an empty array
  if (!subcategory) {
    return [];
  }

  const subcategoryId = subcategory._id;
  console.log(subcategoryId);
  // Query articles based on the subcategory ID
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
  
  const articles = await client.fetch(articlesQuery, { subcategoryId });
  return articles;
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




// Fetch tags from Sanity
export async function getTags() {
  const query = `*[_type == "tag"]`;
  const tags = await client.fetch(query);
  return tags;
}

// Fetch users from Sanity
export async function getUsers() {
  const query = `*[_type == "user"]`;
  const users = await client.fetch(query);
  return users;
}
