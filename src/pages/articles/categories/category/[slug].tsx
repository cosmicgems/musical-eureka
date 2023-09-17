import React from 'react'
import axios from 'axios'

const SlugCategoryPage = () => {
  return (
    <div>SlugCategoryPage</div>
  )
}

export default SlugCategoryPage

export const getStaticPaths = async () => {
  const articles = await axios.get("http://localhost:3000/api/blog/post/get-all-slugs");
  const post = articles.data.post
  const slugs = post.map((a)=> a.slug);
  const paths = slugs.map((slug) => ({
      params: { slug },
  }));
return {
  paths,
  fallback: 'blocking',
};
};

export const getStaticProps = async ({ params: { slug } }) => {
const article = await axios.get(`http://localhost:3000/api/blog/post/${slug}`)
const post = article.data.post;
return {
  props: post,
};
};