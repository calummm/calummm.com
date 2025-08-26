const root = document.documentElement;

if (root.dataset.theme) {
	const checkboxLightTheme = document.getElementById('light-theme');
	checkboxLightTheme.checked = root.dataset.theme === 'light';

	checkboxLightTheme.addEventListener('change', (e) => {
		if (e.target.checked) {
			localStorage.setItem('lightTheme', 'true');
		} else {
			localStorage.removeItem('lightTheme');
		}
	});

	delete root.dataset.theme;
}
