<script>
  import TagBubble from '$lib/components/Tag-bubble.svelte';
  // import type { BlogData } from '$lib/model';
  import Giscus from '@giscus/svelte';

  // export let data: BlogData & { content: any };
  export let data;
</script>

<svelte:head>
  <title>{data.meta.title} | Calummm</title>
  <meta property="og:title" content={data.meta.title} />

  <meta property="og:url" content="https://calummm.com/post/{data.meta.slug}" />
  <meta
    property="og:image"
    content={data.meta.image || 'https://calummm.com/images/splash.png'}
  />
  <meta
    property="twitter:image"
    content={data.meta.image || 'https://calummm.com/images/splash.png'}
  />
  <meta property="og:type" content="article" />
  <meta
    property="og:description"
    data-key="description"
    name="description"
    content={data.meta.description}
  />
  <meta property="og:locale" content="en_AU" />
</svelte:head>

<article class="text-base">
  <div class="container mx-auto px-2">
    <a href="/">Home</a>
    &rsaquo;
    <a style="text-s" href="/post/category/{data.meta.category}"
      >{data.meta.category}</a
    >
    &rsaquo; {data.meta.title}
  </div>
  <div class="max-w-none bg-neutral-100 dark:bg-neutral-800 py-10 my-16">
    <div class="max-w-[52rem] mx-auto text-base sm:text-xl">
      <h1 class="text-5xl mt-0 mb-5">{data.meta.title}</h1>

      <dl class="text-base mt-0 mb-0 flex flex-col gap-2">
        <div class="flex gap-2">
          <dt>Published:</dt>
          <dd>{data.meta.published}</dd>
        </div>

        {#if data.meta.updated && data.meta.updated !== data.meta.published}
          <div class="flex gap-2">
            <dt>Updated:</dt>
            <dd>{data.meta.updated}</dd>
          </div>
        {/if}

        {#if data.meta.tags?.length}
          <div class="flex gap-2 flex-wrap">
            <dt>Tags:</dt>

            {#each data.meta.tags as tagName}
              <dd>
                <TagBubble {tagName} />
                <!-- <a
              href="/post/tag/{tag}"
              class="bg-orange-600 rounded-full py-1 px-2 whitespace-nowrap"
            >
              {tag}
            </a> -->
              </dd>
            {/each}
          </div>
        {/if}
      </dl>
    </div>
  </div>

  <div
    id="post-contents"
    class="mdsvex-content max-w-[initial] prose prose-lg prose-neutral dark:prose-invert mx-auto child:max-w-3xl child:mx-auto child:px-2 child:sm:px-0"
  >
    <svelte:component this={data.content} />
  </div>

  <div class="max-w-[52rem] mx-auto mt-16 mb-16">
    <Giscus
      id="comments"
      term="Welcome to @giscus/react component!"
      repo="calummm/calummm.com"
      repoId="MDEwOlJlcG9zaXRvcnkzMzMzNzAyNDY="
      category="Announcements"
      categoryId="DIC_kwDOE97Ths4CRA-K"
      mapping="og:title"
      strict="1"
      reactionsEnabled="1"
      emitMetadata="1"
      inputPosition="top"
      theme="preferred_color_scheme"
      lang="en"
      loading="lazy"
    />
  </div>
</article>
