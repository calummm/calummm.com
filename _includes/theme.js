const dataset = document.documentElement.dataset;
const isAltTheme = !!dataset.altTheme;

// const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

const checkboxAltTheme = document.getElementById('alt-theme');

checkboxAltTheme.checked = isAltTheme;
delete dataset.altTheme;

checkboxAltTheme.addEventListener('change', (e) => {
	if (e.target.checked) {
		localStorage.setItem('altTheme', 'true');
	} else {
		localStorage.removeItem('altTheme');
	}
});
