import { browser } from '$app/environment';
import { writable } from 'svelte/store';

function createTheme() {
  const initialValue = browser
    ? localStorage.getItem('theme') ?? 'dark'
    : 'dark';

  const { subscribe, set, update } = writable<string>(initialValue);

  return {
    subscribe,
    nextTheme: () =>
      update((theme: string) => {
        const theNextTheme = ((theme) => {
          const currentIndex = themes.indexOf(theme);
          if (currentIndex === -1) {
            return themes[0];
          }

          return themes[currentIndex + 1] ?? themes[0];
        })(theme);

        updateGlobalTheme(theNextTheme);

        return theNextTheme;
      }),
    set,
  };
}

export const theme = createTheme();
export const themes = ['dark', 'light'];

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
