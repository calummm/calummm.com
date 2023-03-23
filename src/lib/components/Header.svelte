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
      <label for="dark-theme">Dark mode:</label>
      <input
        type="checkbox"
        id="dark-theme"
        bind:checked={darkTheme}
        on:change={updateCurrentTheme}
      />
    </li>
  </ul>
</header>
