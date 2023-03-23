import { fetchMarkdownPosts } from '$lib/utils';
import { json } from '@sveltejs/kit';

// export interface Post {

// }

export const GET = async () => {
  const allPosts = await fetchMarkdownPosts();

  const sortedPosts = allPosts.sort((a, b) => {
    return (
      new Date(b.meta.published).getTime() -
      new Date(a.meta.published).getTime()
    );
  });

  return json(sortedPosts);
};