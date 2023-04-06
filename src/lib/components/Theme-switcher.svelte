<script lang="ts">
  import SunLogo from '$lib/icons/sun-icon.svg?component';
  import MoonLogo from '$lib/icons/moon-icon.svg?component';
  import { theme } from '$lib/utils/theme';

  $: isDarkMode = $theme === 'dark';
</script>

<button
  on:click={theme.nextTheme}
  aria-pressed={isDarkMode}
  class="rounded-full ring-offset-2"
>
  <div
    class="relative flex items-center justify-center w-11 h-11 rounded-full border-gray-700 dark:border-gray-200 border-2"
  >
    <span aria-hidden="true" class="dark:hidden">
      <SunLogo width="32" height="32" />
    </span>
    <span aria-hidden="true" class="text-gray-200 hidden dark:block theme-dark">
      <MoonLogo width="32" height="32" />
    </span>
  </div>
</button>
