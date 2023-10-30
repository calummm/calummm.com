<script lang="ts">
  import Rss from './Rss.svelte';
  import ThemeSwitcher from './Theme-switcher.svelte';
</script>

<header class="flex justify-between items-center md:container md:mx-auto p-2">
  <a class="flex-none text-3xl font-semibold" href="/">Calummm</a>

  <nav />
  <ul class="flex gap-2">
    <li>
      <Rss />
    </li>
    <li>
      <ThemeSwitcher />
    </li>
  </ul>
</header>
