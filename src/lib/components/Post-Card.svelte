<script lang="ts">
  import type { Post } from '../../model';
  // import splash from '$lib/assets/images/splash.png';

  export let post: Post;
</script>

<a
  class="flex gap-2 border-2 rounded border-black dark:border-gray-200 p-3"
  href="/post/{post.path}"
>
  <!-- <div class="w-24 h-16 border border-black dark:border-gray-200" /> -->
  <img
    alt=""
    class="w-[100px] h-[60px]"
    src={post.meta.thumbnail || '/images/splash-thumb.png'}
  />
  <div>
    <h2 class="text-xl">{post.meta.title}</h2>
    Published {post.meta.published}
    <p>{post.meta.description}</p>
  </div>
</a>
