<script lang="ts">
  import type { Post } from '$lib/model';
  // import splash from '$lib/assets/images/splash.png';

  export let post: Post;

  let imageName = `/images/posts/${post.meta.image || 'splash-thumb'}`;
</script>

<a
  class="flex flex-col sm:flex-row gap-6 sm:gap-4 rounded hover:transition-colors p-3
  bg-gray-100 hover:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600"
  href="/post/{post.path}"
>
  <!-- <div class="w-24 h-16 border border-black dark:border-gray-200" /> -->
  <div class="sm:max-w-[30%]">
    <picture class="aspect-[4/3]">
      <source srcset="{imageName}.webp 1x, {imageName}_2x.webp 2x" />
      <img alt="" src="{imageName}.webp" />
    </picture>
  </div>
  <!-- class="w-[100px] h-[60px]" -->
  <div class="">
    <h2 class="text-4xl mb-0">{post.meta.title}</h2>
    {#if post.meta.subtitle}
      <div class="text-lg">{post.meta.subtitle}</div>
    {/if}
    <div class="mt-3">Published {post.meta.published}</div>
    <p class="mt-3">{post.meta.description}</p>
  </div>
</a>
