<script lang="ts">
	import { browser } from '$app/environment';
	import { dev } from '$app/environment';

	// Format build date for display
	function formatBuildDate(isoDate: string): string {
		try {
			const date = new Date(isoDate);
			return date.toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			});
		} catch {
			return 'Unknown';
		}
	}

	// Get version info
	const version = browser ? __APP_VERSION__ : 'dev';
	const buildDate = browser && !dev ? formatBuildDate(__BUILD_DATE__) : null;
</script>

<div class="fixed bottom-2 left-2 z-50 text-xs text-base-content/50">
	{#if dev}
		<span class="font-mono">dev mode</span>
	{:else}
		<span class="font-mono">
			v{version}
			{#if buildDate}
				<span class="mx-1">•</span>
				{buildDate}
			{/if}
		</span>
	{/if}
</div>
