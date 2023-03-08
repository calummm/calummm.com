<script lang="ts">
  import { tagList, type Tag, type TagDef } from '$lib/utils/tags';

  export let tagName: string;
  let tagDef: TagDef = tagList[tagName];
</script>

{#if tagDef}
  <a
    href="/post/tag/{tagDef.urlName ?? tagName}"
    class="rounded-full py-1 px-2 whitespace-nowrap"
    style:color={tagDef.color || 'black'}
    style:background-color={tagDef.backgroundColor || 'grey'}
  >
    {tagName}
  </a>
{:else}{/if}
