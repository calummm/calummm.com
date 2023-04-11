<script lang="ts">
  import Giscus from '@giscus/svelte';
  import TagBubble from '$lib/components/Tag-bubble.svelte';
  import type { BlogData } from '$lib/model';

  export let data: BlogData;
</script>

<svelte:head>
  <title>{data.meta.title} | Calummm</title>
  <meta property="og:title" content={data.meta.title} />

  <meta property="og:url" content="https://calummm.com/post/{data.meta.slug}" />
  <meta
    property="og:image"
    content={data.meta.thumbnail || 'https://calummm.com/images/splash.png'}
  />
  <meta
    property="twitter:image"
    content={data.meta.thumbnail || 'https://calummm.com/images/splash.png'}
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

<article class="sm:container sm:mx-auto text-base max-w-prose p-2">
  <span>
    <a href="/">Home</a>
    >
    <a style="text-s" href="/post/category/{data.meta.category}"
      >{data.meta.category}</a
    >
    > {data.meta.title}
  </span>

  <div class="text-base sm:text-xl max-w-prose sm:mx-auto">
    <h1 class="text-5xl mt-16 mb-5">{data.meta.title}</h1>

    <dl class="text-base mt-5 mb-16 flex flex-col gap-2">
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

    <div id="post-contents" class="sm:mx-3">
      <svelte:component this={data.content} />
    </div>

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

<style lang="scss" global>
  #post-contents {
    // @apply gap-6;
    & > * {
      @apply mb-6;
    }

    h2,
    h3,
    h4,
    h5,
    h6 {
      @apply text-3xl mt-7 mb-4;

      .icon-link {
        @apply text-black relative cursor-pointer;

        &::before {
          content: '#';
          @apply px-3 absolute opacity-0 text-black gdark:text-gray-200;

          left: -2ch;
          top: 0;
          line-height: 1;
          opacity: 0;
        }
      }

      &:hover .icon-link::before {
        @apply opacity-100;
      }
    }

    h2 {
      @apply text-3xl mt-7 mb-4;
    }
    h3 {
      @apply text-2xl mt-7 mb-4;
    }
    h4 {
      @apply text-xl mt-7 mb-4;
    }
    h5 {
      @apply text-lg mt-7 mb-4;
    }
    h6 {
      @apply pt-7 mb-7;
    }

    ul {
      @apply mt-2 list-disc list-inside ml-4;
    }

    ol {
      @apply mt-2 list-decimal list-inside ml-4;
    }

    a {
      @apply text-blue-800 gdark:text-blue-300 underline;
    }

    p {
      @apply mt-7 mb-0 leading-relaxed;
    }

    :where(h2, h3, h4, h5, h6) {
      //   .icon-link {
      //     position: relative;

      //     &::before {
      //       content: '#';
      //       position: absolute;
      //       left: -1ch;
      //       top: 0;
      //       line-height: 1;
      //       opacity: 0;
      //       text-decoration: underline;
      //     }
      //   }

      //   &:hover .icon-link::before {
      //     opacity: 1;
      //   }
    }
  }
</style>
