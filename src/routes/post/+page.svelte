<script>
  import PostCard from '$lib/components/Post-Card.svelte';

  export let data;
</script>

<h1>Tag</h1>

<ul class="mt-3 flex flex-col gap-3">
  {#each data.posts as post}
    <li>
      <PostCard {post} />
    </li>
  {/each}
</ul>
