import { fetchMarkdownPosts } from '$lib/utils';
import { json } from '@sveltejs/kit';

export const GET = async () => {
  const allPosts = await fetchMarkdownPosts();

  const tags: Record<string, number> = {};

  console.log(allPosts);
  allPosts.forEach((post) => {
    if (post?.meta?.tags?.length) {
      post.meta.tags.forEach((tag) => {
        tags[tag] ??= 0;
        tags[tag]++;
      });
    }
  });

  return json(
    Object.keys(tags).map((tag) => ({ name: tag, count: tags[tag] }))
  );
};
