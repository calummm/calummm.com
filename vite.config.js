import { sveltekit } from '@sveltejs/kit/vite';
import path from "path"

/** @type {import('vite').UserConfig} */
const config = {
	resolve: {
        alias: {
            // '$lib': path.resolve('./src/lib/'),
            // '$base': path.resolve('./src/baseApp'),
        },
    },
	plugins: [sveltekit()]
};

export default config;
