import type { BlogMetaData } from 'src/model';

export const fetchMarkdownPosts = async () => {
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
      }> => {
        const { metadata } = await resolver();
        console.log(metadata, path);

        const postPath = path.slice(11, -3);

        return {
          meta: metadata,
          path: postPath,
        };
      }
    )
  );

  return allPosts;
};
