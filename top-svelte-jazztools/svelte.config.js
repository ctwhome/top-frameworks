import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-auto';
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
		// Auto adapter - works with most platforms
		// For Jazz, we don't need edge runtime since all data ops are client-side
		adapter: adapter()
	},
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
