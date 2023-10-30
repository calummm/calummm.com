import type { Post } from '$lib/model.js';

export const load = async ({ fetch, params }) => {
  const response = await fetch(`/api/posts`);
  const allPosts = await response.json();

  const posts = allPosts.filter((post: Post) =>
    post.meta.tags.includes('game')
  );

  return {
    posts,
  };
};
