<script>
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  import { fade } from 'svelte/transition';

  export let data;
</script>

<div class="flex flex-col min-h-screen">
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
