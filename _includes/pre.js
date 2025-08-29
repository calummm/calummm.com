const isStoredAltTheme = localStorage.getItem('altTheme') === 'true';
// ||	window.matchMedia('(prefers-color-scheme: light)').matches;

// const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

// const root = document.documentElement;
// root.dataset.theme = prefersLight
// 	? storedAltTheme
// 		? 'dark'
// 		: 'light'
// 	: storedAltTheme
// 	? 'light'
// 	: 'dark';

if (isStoredAltTheme) {
	document.documentElement.dataset.altTheme = true;
}
