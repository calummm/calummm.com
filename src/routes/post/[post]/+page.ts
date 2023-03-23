import { error } from '@sveltejs/kit';
import type { BlogData } from '../../../model';

export async function load({
  params,
}: {
  params: { post: string };
}): Promise<BlogData> {
  try {
    const post = await import(`../../../posts/${params.post}.md`);

    return {
      content: post.default,
      // PostContent: post.default.render().html,
      // Content: post.default,
      meta: { ...post.metadata, slug: params.post },
    };
  } catch (err: unknown) {
    throw error(404, err as unknown as string);
  }
}