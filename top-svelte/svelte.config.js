import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			smartypants: {
				dashes: 'oldschool'
			}
		})
	],
	kit: {
		// Vercel adapter with edge runtime
		adapter: adapter({
			runtime: 'edge'
		})
	},
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
