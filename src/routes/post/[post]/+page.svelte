<script lang="ts">
  import type { BlogData } from 'src/model';

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
  <span>Home > {data.meta.category} > {data.meta.title}</span>
  <h1 class="text-4xl">{data.meta.title}</h1>

  <dl class="pt-2">
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
      <div class="flex gap-2">
        <dt>Tags:</dt>

        {#each data.meta.tags as category}
          <dd>
            <a
              href="/post/tag/{category}"
              class="bg-orange-600 rounded-full py-1 px-2"
            >
              {category}
            </a>
          </dd>
        {/each}
      </div>
    {/if}
  </dl>

  <div id="post-contents" class="pt-2">
    <svelte:component this={data.content} />
  </div>
</article>

<style lang="scss" global>
  #post-contents {
    h2 {
      @apply text-3xl pt-2;
    }
    h3 {
      @apply text-2xl pt-2;
    }
    h4 {
      @apply text-xl pt-2;
    }
    h5 {
      @apply text-lg pt-2;
    }
    h6 {
      @apply pt-2;
    }

    ul {
      @apply list-disc list-inside ml-2;
    }

    ol {
      @apply list-decimal list-inside ml-2;
    }

    a {
      @apply text-blue-800 underline;
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
