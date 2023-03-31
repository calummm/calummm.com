import type { BlogMetaData } from '../../../src/model';

/**
 *
 * @returns All posts sorted in order of published date
 */
export const fetchMarkdownPosts = async (sorted = true, onlyVisible = true) => {
  const allPostFiles = import.meta.glob<
    boolean,
    string,
    { metadata: BlogMetaData }
  >('/src/posts/*.md');
  const iterablePostFiles = Object.entries(allPostFiles);

  const allPosts = await Promise.all(
    iterablePostFiles.map(
      async ([path, resolver]): Promise<{
        meta: BlogMetaData;
        path: string;
        publishTime: number;
      }> => {
        const { metadata } = await resolver();

        const postPath = path.slice(11, -3);

        return {
          meta: metadata,
          path: postPath,
          publishTime: Date.parse(metadata.published),
        };
      }
    )
  );

  const posts = onlyVisible
    ? allPosts.filter((post) => post.meta.visible !== false)
    : allPosts;

  return sorted ? posts.sort((a, b) => b.publishTime - a.publishTime) : posts;
};
