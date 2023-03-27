import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
// import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
  resolve: {
    alias: {
      // '$lib': path.resolve('./src/lib/'),
      // '$base': path.resolve('./src/baseApp'),
    },
  },
  plugins: [sveltekit(), SvelteKitPWA()],
};

export default config;
