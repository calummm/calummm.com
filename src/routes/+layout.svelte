<script>
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';
  import '../app.css';
  import '../code-styles.scss';
  // import '../post-styles.scss';

  import { fade } from 'svelte/transition';

  export let data;
</script>

<div
  class="flex flex-col min-h-screen bg-white text-gray-800 dark:bg-neutral-800 dark:text-gray-200"
>
  <Header />

  {#key data.currentRoute}
    <main
      class="grow"
      in:fade={{ duration: 150, delay: 150 }}
      out:fade={{ duration: 150 }}
    >
      <slot />
    </main>
  {/key}
</div>

<Footer />
