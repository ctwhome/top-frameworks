<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/ui/Header.svelte';
	import SideMenu from '$lib/components/ui/SideMenu.svelte';
	import Version from '$lib/components/ui/Version.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="relative grid h-dvh w-dvw grid-rows-[auto_1fr] overflow-hidden">
	<Header />
	<SideMenu />
	<main class="overflow-auto">
		{@render children?.()}
	</main>
	<Version />
</div>
