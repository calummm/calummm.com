/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/prismjs/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography', 'tailwindcss-global-dark'),
    function ({ addVariant }) {
      addVariant('child', '& > *');
    },
  ],
};
