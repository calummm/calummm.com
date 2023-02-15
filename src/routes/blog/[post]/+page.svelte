<script lang="ts">
  import type { BlogData } from 'src/model';

  export let data: BlogData;
  // const { Content } = data;
</script>

<svelte:head>
  <title>{data.meta.title} | Calummm</title>
</svelte:head>

<article class="md:container md:mx-auto p-2">
  <h1>{data.meta.title}</h1>

  <p>Published: {data.meta.date}</p>

  {#if data.meta.tags.length}
    <aside>
      <h2>Tags:</h2>
      <ul>
        {#each data.meta.tags as category}
          <li>
            <a href="/blog/tag/{category}">
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
