<script lang="ts">
	/**
	 * Jazz + Better Auth Integration Setup
	 *
	 * This component connects Jazz context to Better Auth client.
	 * It must be rendered inside JazzSvelteProvider.
	 */
	import { getJazzContext, getAuthSecretStorage } from 'jazz-tools/svelte';
	import { authClient } from '$lib/auth/auth-client';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		try {
			const jazzContext = getJazzContext();
			const authSecretStorage = getAuthSecretStorage();

			// Connect Jazz context to Better Auth client
			// getJazzContext returns { current: JazzContextType }, we need to pass current
			if (jazzContext.current) {
				authClient.jazz.setJazzContext(jazzContext.current);
			}
			authClient.jazz.setAuthSecretStorage(authSecretStorage);

			console.log('Jazz + Better Auth connected');
		} catch (error) {
			console.error('Failed to connect Jazz + Better Auth:', error);
		}
	});
</script>

{#if children}
	{@render children()}
{/if}
