<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="-mt-20 w-full overflow-auto px-3 break-words">
	<div class="prose sm:prose-lg mx-auto py-20">
		{@render children?.()}
	</div>
</div>
