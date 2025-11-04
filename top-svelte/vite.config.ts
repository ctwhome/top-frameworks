import devtoolsJson from 'vite-plugin-devtools-json';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import Icons from 'unplugin-icons/vite';
import path from 'node:path';

export default defineConfig({
	server: {
		fs: {
			allow: [
				searchForWorkspaceRoot(process.cwd()),
				path.resolve(__dirname, 'locale')
			]
		}
	},
	plugins: [
		tailwindcss(),
		sveltekit(),
		paraglideVitePlugin({
			project: './locale/project.inlang',
			outdir: './src/lib/paraglide'
		}),
		devtoolsJson(),
		Icons({
			compiler: 'svelte',
			autoInstall: true
		})
	]
});
