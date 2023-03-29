<script lang="ts">
  import { tagList, type Tag } from '$lib/utils/tags';

  export let tagName: string;
  export let tag: Tag | null = null;

  if (tagName && !tag) {
    tag = {
      name: tagName,
      ...tagList[tagName],
    };
  }
</script>

{#if tag?.name}
  <a
    href="/post/tag/{tag.urlName ?? tag.name}"
    class="rounded-full py-1 px-3 whitespace-nowrap bg-gray-200 text-black dark:bg-gray-700 dark:text-gray-200"
    title={tag.description}
  >
    {tagName}
  </a>
{/if}
