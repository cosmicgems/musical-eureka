import { client } from '../lib/client.js'; // Replace with your Sanity client initialization
import { groq } from 'next-sanity';

// Fetch articles from Sanity
export async function getArticles() {
  // Initialize the Sanity client

  // Query to fetch the article data with populated postedBy field
  const query = groq`
    *[_type == "article"]{
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

  // Fetch the articles from Sanity
  const articles = await client.fetch(query);
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
