const storedLightTheme =
	localStorage.getItem('lightTheme') === 'true' ||
	window.matchMedia('(prefers-color-scheme: light)').matches;

const root = document.documentElement;
root.style.setProperty('--first-color', 'red');
root.dataset.theme = storedLightTheme ? 'light' : 'dark';
// console.dir(root);

// setTimeout(() => {
// 	const checkboxLightTheme = document.getElementById('light-theme');
// 	checkboxLightTheme.checked = storedLightTheme;

// 	checkboxLightTheme.addEventListener('change', (e) => {
// 		if (e.target.checked) {
// 			localStorage.setItem('lightTheme', 'true');
// 		} else {
// 			localStorage.removeItem('lightTheme');
// 		}
// 	});
// }, 0);
