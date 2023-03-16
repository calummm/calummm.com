<script lang="ts">
  import TagBubble from '$lib/components/Tag-bubble.svelte';
  import type { BlogData } from '../../../../src/model';

  export let data: BlogData;
  // const { Content } = data;
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

<article class="md:container md:mx-auto p-2">
  <span>
    <a href="/">Home</a>
    >
    <a style="text-s" href="/post/category/{data.meta.category}"
      >{data.meta.category}</a
    >
    > {data.meta.title}
  </span>

  <h1 class="text-5xl my-6">{data.meta.title}</h1>

  <dl class="mt-2 mb-2 flex flex-col gap-1">
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

  <div id="post-contents" class="">
    <svelte:component this={data.content} />
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
          @apply px-3 absolute opacity-0;

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
      @apply text-blue-800 underline;
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
