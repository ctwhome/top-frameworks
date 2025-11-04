<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<!-- DEFAULT Layout 🩻🩻🩻🩻🩻🩻 -->

<div class="prose sm:prose-lg mx-auto w-full overflow-auto px-3 break-words">
	{@render children?.()}
</div>
