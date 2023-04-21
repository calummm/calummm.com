import type { Tag } from '../../api/tags/+server.js';

export const load = async ({ fetch /*, params*/ }) => {
  const response = await fetch(`/api/tags`);
  const tags: Tag[] = await response.json();

  return {
    tags,
  };
};
