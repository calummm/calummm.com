import { fetchMarkdownPosts } from '$lib/utils';
import { json } from '@sveltejs/kit';

export interface Tag {
  name: string;
  count: number;
  description: string;
  color: string;
}

export const GET = async () => {
  const allPosts = await fetchMarkdownPosts();

  const tags: Record<string, number> = {};

  allPosts.forEach((post) => {
    if (post?.meta?.tags?.length) {
      post.meta.tags.forEach((tag: string) => {
        tags[tag] ??= 0;
        tags[tag]++;
      });
    }
  });

  return json(
    Object.keys(tags).map((tag) => ({ name: tag, count: tags[tag] }))
  );
};
