<script lang="ts">
	/**
	 * Jazz Provider Component
	 *
	 * Wraps the application with Jazz's Svelte provider to enable:
	 * - Real-time data sync across devices
	 * - Offline-first data storage
	 * - End-to-end encryption
	 * - Passkey authentication with recovery key
	 *
	 * This component should wrap the entire app in +layout.svelte
	 */
	import { JazzSvelteProvider } from 'jazz-tools/svelte';
	import { TodoAccount } from '$lib/jazz/schema';
	import { PUBLIC_JAZZ_API_KEY } from '$env/static/public';
	import JazzAuth from './JazzAuth.svelte';

	let { children } = $props();

	// Configure Jazz sync peer (connection to Jazz Cloud)
	const sync = {
		peer: `wss://cloud.jazz.tools/?key=${PUBLIC_JAZZ_API_KEY}`
	};
</script>

<JazzSvelteProvider {sync} AccountSchema={TodoAccount}>
	<JazzAuth appName="Top Svelte Todo">
		{@render children?.()}
	</JazzAuth>
</JazzSvelteProvider>
