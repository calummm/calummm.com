const storedLightTheme =
	localStorage.getItem('lightTheme') === 'true' ||
	window.matchMedia('(prefers-color-scheme: light)').matches;

const root = document.documentElement;
root.dataset.theme = storedLightTheme ? 'light' : 'dark';
