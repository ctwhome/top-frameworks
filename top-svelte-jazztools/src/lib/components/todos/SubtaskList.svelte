<script lang="ts">
	/**
	 * SubtaskList Component
	 *
	 * Manages nested subtasks within a todo item:
	 * - Add new subtasks
	 * - Mark subtasks complete/incomplete
	 * - Delete subtasks
	 *
	 * All changes sync in real-time via Jazz.
	 */
	import type { SubtaskList } from '$lib/jazz/schema';
	import { Subtask } from '$lib/jazz/schema';
	import toast from 'svelte-french-toast';

	interface Props {
		subtasks: SubtaskList;
	}

	let { subtasks }: Props = $props();

	let newSubtaskTitle = $state('');

	// Add new subtask
	function addSubtask() {
		const trimmed = newSubtaskTitle.trim();
		if (!trimmed) {
			toast.error('Please enter a subtask title');
			return;
		}

		try {
			const subtask = Subtask.create({
				title: trimmed,
				completed: false
			});

			subtasks.$jazz.push(subtask);
			newSubtaskTitle = '';
			toast.success('Subtask added!');
		} catch (error) {
			console.error('Failed to add subtask:', error);
			toast.error('Failed to add subtask');
		}
	}

	// Toggle subtask completion
	function toggleSubtask(subtask: any) {
		subtask.$jazz.set('completed', !subtask.completed);
	}

	// Delete subtask
	function deleteSubtask(index: number) {
		subtasks.$jazz.splice(index, 1);
		toast.success('Subtask deleted!');
	}

	// Handle Enter key in input
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			addSubtask();
		}
	}
</script>

<div class="space-y-2 rounded-lg border border-base-300 bg-base-200 p-3">
	<!-- Subtask List -->
	<div class="space-y-1">
		{#each subtasks as subtask, index}
			<div class="flex items-center gap-2">
				<!-- Checkbox -->
				<input
					type="checkbox"
					checked={subtask.completed}
					onchange={() => toggleSubtask(subtask)}
					class="checkbox checkbox-sm"
				/>

				<!-- Title -->
				<span
					class="flex-1 text-sm"
					class:line-through={subtask.completed}
					class:opacity-60={subtask.completed}
				>
					{subtask.title}
				</span>

				<!-- Delete Button -->
				<button
					class="btn btn-ghost btn-xs text-error"
					onclick={() => deleteSubtask(index)}
					title="Delete subtask"
				>
					×
				</button>
			</div>
		{/each}
	</div>

	<!-- Add Subtask Input -->
	<div class="flex gap-2">
		<input
			type="text"
			bind:value={newSubtaskTitle}
			onkeydown={handleKeydown}
			placeholder="Add subtask..."
			class="input input-sm input-bordered flex-1"
		/>
		<button class="btn btn-primary btn-sm" onclick={addSubtask} disabled={!newSubtaskTitle.trim()}>
			+
		</button>
	</div>
</div>
