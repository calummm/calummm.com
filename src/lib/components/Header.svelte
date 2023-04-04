<script lang="ts">
  import { browser } from '$app/environment';

  import SunLogo from '$lib/icons/sun-icon.svg?component';
  import MoonLogo from '$lib/icons/moon-icon.svg?component';

  let currentTheme = 'light';
  let darkTheme = false;

  if (browser) {
    currentTheme = localStorage.getItem('theme') ?? window['theme'] ?? 'light';
    darkTheme = currentTheme === 'dark';
  }

  const updateCurrentTheme = () => {
    if (darkTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };
</script>

<header class="flex justify-between items-center md:container md:mx-auto p-2">
  <a class="flex-none text-3xl font-semibold" href="/">Calummm</a>

  <nav />
  <ul class="flex gap-1">
    <!-- <li>
        <a href="/post">Blog</a>
      </li> -->
    <!-- <li><button class="w-16 h-16 rounded-full border-black border-2" /></li>
    <li><button class="w-16 h-16 rounded-full border-black border-2" /></li> -->
    <!-- <li>
      <button
        class="w-16 h-16 rounded-full border-black border-2 flex justify-center items-center"
        aria-labelledby="site menu"
      >
        <div class="space-y-2">
          <span class="block w-8 h-1 bg-black rounded-full" />
          <span class="block w-8 h-1 bg-black rounded-full" />
          <span class="block w-8 h-1 bg-black rounded-full" />
        </div>
      </button> 
    </li>-->
    <li>
      <input
        type="checkbox"
        id="dark-theme"
        class="theme-input peer opacity-0 absolute w-0 h-0"
        bind:checked={darkTheme}
        on:change={updateCurrentTheme}
      />
      <label
        class="theme-label relative flex items-center justify-center w-11 h-11 rounded-full border-gray-700 dark:border-gray-200 border-2
        peer-focus-visible:ring"
        for="dark-theme"
        aria-label="Change theme"
      >
        <span aria-hidden="true" class="absolute theme-light">
          <SunLogo width="32" />
        </span>
        <span
          aria-hidden="true"
          class="absolute text-gray-200 invisible theme-dark"
        >
          <MoonLogo width="32" />
        </span>
      </label>
    </li>
  </ul>
</header>

<style lang="scss">
  .theme-input {
    &:checked ~ .theme-label {
      .theme-dark {
        @apply visible;
      }
      .theme-light {
        @apply invisible;
      }
    }
  }
</style>
