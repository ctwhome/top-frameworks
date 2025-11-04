<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<!-- DEFAULT Layout 🩻🩻🩻🩻🩻🩻 -->

<div class="prose sm:prose-lg mx-auto px-3">
	{@render children?.()}
</div>
