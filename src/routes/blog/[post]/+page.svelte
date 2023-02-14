<script>
  export let data;
</script>

<svelte:head>
  <title>{data.meta.title} | Calummm</title>
</svelte:head>

<article class="md:container md:mx-auto p-2">
  FROM SLUG
  <h1>{data.meta.title}</h1>

  <p>Published: {data.meta.date}</p>

  {@html data.PostContent}

  <!-- <data.Post />
	<data.Content /> -->

  <!-- <slot>
    
  </slot> -->
</article>
