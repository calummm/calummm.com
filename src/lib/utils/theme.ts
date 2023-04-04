import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const theme = writable('dark');
export const themes = ['dark', 'light'];

if (browser) {
  theme.set(localStorage.getItem('theme') ?? 'dark');
}

export const nextTheme = async () => {
  theme.update((theme: string) => {
    const theNextTheme = ((theme) => {
      const currentIndex = themes.indexOf(theme);
      if (currentIndex === -1) {
        return themes[0];
      }

      return themes[currentIndex + 1] ?? themes[0];
    })(theme);

    updateGlobalTheme(theNextTheme);

    return theNextTheme;
  });
};

const updateGlobalTheme = (theme: string) => {
  localStorage.setItem('theme', theme);

  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  }
};
