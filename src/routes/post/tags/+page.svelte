<script>
  export let data;
</script>

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
