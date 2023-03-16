<script>
  export let data;
</script>

<svelte:head>
  <title>Calummm</title>
</svelte:head>

<article class="md:container md:mx-auto p-2">
  <h1 class="hidden">Welcome</h1>

  <ul class="mt-3 flex flex-col gap-3">
    {#each data.posts as post}
      <li class="shadow">
        <a
          class="flex gap-2 border-2 rounded border-black dark:border-gray-200 p-3"
          href="/post/{post.path}"
        >
          <div class="w-24 h-16 border border-black dark:border-gray-200" />
          <div>
            <h2>{post.meta.title}</h2>
            Published {post.meta.published}
          </div>
        </a>
      </li>
    {/each}
  </ul>
</article>
