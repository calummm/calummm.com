<script lang="ts">
  import type { BlogData } from 'src/model';

  export let data: BlogData;
  // const { Content } = data;
</script>

<svelte:head>
  <title>{data.meta.title} | Calummm</title>
  <meta property="og:title" content={data.meta.title} />

  <!-- <meta property="og:url" content="https://ahrefs.com/blog/open-graph-meta-tags/" /> -->
  <meta property="og:image" content={data.meta.thumbnail} />
  <meta property="og:type" content="article" />
  <meta property="og:description" content={data.meta.description} />
  <meta property="og:locale" content="en_AU" />
</svelte:head>

<article class="md:container md:mx-auto p-2">
  <span>Home > {data.meta.category} > {data.meta.title}</span>
  <h1>{data.meta.title}</h1>

  <p>Published: {data.meta.published}</p>

  {#if data.meta.tags?.length}
    <aside>
      <h2>Tags:</h2>
      <ul>
        {#each data.meta.tags as category}
          <li>
            <a href="/post/tag/{category}">
              {category}
            </a>
          </li>
        {/each}
      </ul>
    </aside>
  {/if}

  {@html data.PostContent}

  <!-- <Content /> -->

  <!-- <svelte:component this={data.content} /> -->

  <!-- <data.Post />
	<data.Content /> -->

  <!-- <slot>
    
  </slot> -->
</article>

<style lang="scss">
  :where(h2, h3, h4, h5, h6) {
    .icon-link {
      position: relative;

      &::before {
        content: '#';
        position: absolute;
        left: -1ch;
        top: 0;
        line-height: 1;
        opacity: 0;
        text-decoration: underline;
      }
    }

    &:hover .icon-link::before {
      opacity: 1;
    }
  }
</style>
