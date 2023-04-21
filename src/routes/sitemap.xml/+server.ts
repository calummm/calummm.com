import { fetchMarkdownPosts } from '$lib/utils/posts';

const website = `https://calummm.com`;

export async function GET(event) {
  const posts = await fetchMarkdownPosts(true, true);

  return new Response(
    `
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
    <url>
      <loc>${website}</loc>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>
    ${posts
      .map(
        (post) =>
          `
          <url>
            <loc>${website}/post/${post?.path}</loc>
            <changefreq>daily</changefreq>
            <priority>0.7</priority>
          </url>`
      )
      .join('')}
    </urlset>`.trim(),
    {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'max-age=0, s-maxage=3600',
      },
    }
  );
}
