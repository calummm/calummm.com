<script lang="ts">
  import type { Tag } from '../../api/tags/+server.js';
  export let data: { tags: Tag[] };
</script>

<article class="md:container md:mx-auto p-2">
  <span>
    <a href="/">Home</a>
  </span>
  <h1>Tags</h1>

  <ul>
    {#each data.tags as tag}
      <li>
        <a href="./tag/{tag.name}">
          {tag.name}:{tag.count}
        </a>
      </li>
    {/each}
  </ul>
</article>
