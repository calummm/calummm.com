<script lang="ts">
  import PostCard from '$lib/components/Post-Card.svelte';
  import type { Post } from '$lib/model.js';
  import type { Tag } from '../../../api/tags/+server.js';

  export let data: { tag: Tag; posts: Post[] };
</script>

<article class="md:container md:mx-auto p-2">
  <span>
    <a href="/">Home</a>
    &rsaquo; Games
  </span>
  <h1 class="text-5xl my-6">Games</h1>

  <ul class="mt-3 flex flex-col gap-3">
    {#each data.posts as post}
      <li>
        <PostCard {post} />
      </li>
    {/each}
  </ul>
</article>
