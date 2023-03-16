<script>
  export let data;
</script>

<article class="md:container md:mx-auto p-2">
  <span>
    <a href="/">Home</a>
    > {data.category}
  </span>
  <h1>Blog</h1>

  <ul>
    {#each data.posts as post}
      <li>
        <h2>
          <a href="../{post.path}">
            {post.meta.title}
          </a>
        </h2>
        Published {post.meta.published}
      </li>
    {/each}
  </ul>
</article>
