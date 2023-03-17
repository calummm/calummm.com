<script>
  import PostCard from '$lib/components/Post-Card.svelte';

  export let data;
</script>

<article class="md:container md:mx-auto p-2">
  <span>
    <a href="/">Home</a>
    > {data.tag}
  </span>
  <h1 class="text-5xl my-6">{data.tag}</h1>

  <ul class="mt-3 flex flex-col gap-3">
    {#each data.posts as post}
      <li>
        <PostCard {post} />
      </li>
    {/each}
  </ul>
</article>
