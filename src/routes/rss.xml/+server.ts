import type { Post } from '$lib/model';
import { fetchMarkdownPosts } from '$lib/utils/posts';

const siteURL = 'https://calummm.com';
const siteTitle = 'Calummm';
const siteDescription = 'A human blog';

export const prerender = true;

export const GET = async () => {
  const allPosts = await fetchMarkdownPosts();

  const body = render(allPosts);
  const options = {
    headers: {
      'Cache-Control': 'max-age=0, s-maxage=3600',
      'Content-Type': 'application/xml',
    },
  };

  return new Response(body, options);
};

const render = (posts: Post[]) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${siteTitle}</title>
<description>${siteDescription}</description>
<link>${siteURL}</link>
<atom:link href="${siteURL}/rss.xml" rel="self" type="application/rss+xml"/>
${posts
  .map(
    (post) => `<item>
<guid isPermaLink="true">${siteURL}/post/${post.path}</guid>
<title>${post.meta.title}</title>
<link>${siteURL}/post/${post.path}</link>
<description>${post.meta.title}</description>
<pubDate>${new Date(post.meta.published).toUTCString()}</pubDate>
</item>`
  )
  .join('')}
</channel>
</rss>
`;
