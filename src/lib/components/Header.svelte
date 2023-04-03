<script lang="ts">
  import { browser } from '$app/environment';
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
        class="theme-input"
        bind:checked={darkTheme}
        on:change={updateCurrentTheme}
      />
      <label
        class="theme-label relative flex items-center justify-center w-14 h-14 rounded-full border-gray-700 dark:border-gray-200 border-2"
        for="dark-theme"
        aria-label="Change theme"
      >
        <span
          aria-hidden="true"
          class="theme-light absolute flex items-center justify-center"
        />
        <span
          aria-hidden="true"
          class="theme-dark absolute flex items-center justify-center invisible"
        />
      </label>
    </li>
  </ul>
</header>

<style lang="scss">
  .theme-input {
    @apply opacity-0 absolute w-0 h-0;

    &:focus ~ .theme-label {
      @apply ring;
    }

    &:checked ~ .theme-label {
      .theme-dark {
        @apply visible;
      }
      .theme-light {
        @apply invisible;
      }
    }
  }

  .theme-label {
  }

  .theme-light {
    &::after {
      content: '';
      @apply absolute bg-gray-700 w-7 h-7 rotate-[25deg];
    }
    &::before {
      content: '';
      @apply absolute bg-gray-700 w-7 h-7 rotate-[160deg];
    }
  }

  .theme-dark {
    @apply w-8 h-8 rounded-full right-[0px] top-[0px];
    box-shadow: -9px 9px 0 0 white;
  }
</style>
