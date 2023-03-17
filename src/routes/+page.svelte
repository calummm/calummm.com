<script>
  import PostCard from '$lib/components/Post-Card.svelte';

  export let data;
</script>

<svelte:head>
  <title>Calummm</title>
</svelte:head>

<article class="md:container md:mx-auto p-2">
  <h1 class="hidden">Welcome</h1>

  <ul class="mt-3 flex flex-col gap-3">
    {#each data.posts as post}
      <li>
        <PostCard {post} />
      </li>
    {/each}
  </ul>
</article>
