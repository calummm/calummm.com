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
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['cobertura', 'text'],
      all: true,
      exclude: [
        'coverage/**',
        '{build,dist,.svelte-kit,.netlify}/**',
        'packages/*/test{,s}/**',
        '**/*model.{js,ts}',
        '**/*.d.ts',
        'cypress/**',
        'test{,s}/**',
        'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
        '**.config.*',
        '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
        '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
        '**/__tests__/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
        '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',
      ],
    },
  },
};

export default config;
