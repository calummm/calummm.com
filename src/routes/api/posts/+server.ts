import { fetchMarkdownPosts } from '$lib/utils';
import { json } from '@sveltejs/kit';

// export interface Post {

// }

export const GET = async () => {
  const allPosts = await fetchMarkdownPosts();
  return json(allPosts);
};
