import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import svg from '@poppanator/sveltekit-svg';
// import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
  resolve: {
    alias: {
      // '$lib': path.resolve('./src/lib/'),
      // '$base': path.resolve('./src/baseApp'),
    },
  },
  plugins: [
    sveltekit(),
    SvelteKitPWA(),
    svg({
      includePaths: ['./src/lib/icons/'],
      svgoOptions: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: { overrides: { removeViewBox: false } },
          },
        ],
      },
    }),
  ],
};

export default config;
