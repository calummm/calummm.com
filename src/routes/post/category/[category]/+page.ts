import type { Post } from '$lib/model.js';

export const load = async ({ fetch, params }) => {
  const { category } = params;
  const categorySan = params.category?.toLowerCase();
  const response = await fetch(`/api/posts`);
  const allPosts = await response.json();

  const posts = allPosts.filter(
    (post: Post) => post.meta.category.toLowerCase() === categorySan
  );

  return {
    category,
    categorySan,
    posts,
  };
};
