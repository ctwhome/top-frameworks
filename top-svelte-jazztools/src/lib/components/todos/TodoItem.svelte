<script lang="ts">
	/**
	 * TodoItem Component
	 *
	 * Displays a single todo with all its features:
	 * - Checkbox to mark complete/incomplete
	 * - Priority badge
	 * - Due date display
	 * - Category tag
	 * - Edit mode (double-click)
	 * - Delete button
	 * - Subtasks list
	 *
	 * All changes sync in real-time via Jazz.
	 */
	import type { Todo } from '$lib/jazz/schema';
	import SubtaskList from './SubtaskList.svelte';
	import toast from 'svelte-french-toast';

	interface Props {
		todo: Todo;
		onDelete: () => void;
	}

	let { todo, onDelete }: Props = $props();

	let isEditing = $state(false);
	let editedTitle = $state('');
	let showSubtasks = $state(false);

	// Priority badge colors
	const priorityColors = {
		low: 'badge-info',
		medium: 'badge-warning',
		high: 'badge-error'
	};

	// Toggle completion status
	function toggleComplete() {
		todo.$jazz.set('completed', !todo.completed);
		toast.success(todo.completed ? 'Todo completed!' : 'Todo reopened');
	}

	// Start editing mode
	function startEdit() {
		isEditing = true;
		editedTitle = todo.title;
	}

	// Save edited title
	function saveEdit() {
		const trimmed = editedTitle.trim();
		if (trimmed) {
			todo.$jazz.set('title', trimmed);
			toast.success('Todo updated!');
		}
		isEditing = false;
	}

	// Cancel editing
	function cancelEdit() {
		isEditing = false;
		editedTitle = '';
	}

	// Handle Enter/Escape in edit mode
	function handleEditKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			saveEdit();
		} else if (event.key === 'Escape') {
			cancelEdit();
		}
	}

	// Format due date
	function formatDueDate(date: Date): string {
		return new Date(date).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	}

	// Check if overdue
	function isOverdue(date: Date): boolean {
		return new Date(date) < new Date() && !todo.completed;
	}
</script>

<div
	class="card bg-base-100 shadow-sm transition-all hover:shadow-md"
	class:opacity-60={todo.completed}
>
	<div class="card-body p-4">
		<div class="flex items-start gap-3">
			<!-- Checkbox -->
			<input
				type="checkbox"
				checked={todo.completed}
				onchange={toggleComplete}
				class="checkbox checkbox-primary mt-1"
			/>

			<!-- Content -->
			<div class="flex-1 space-y-2">
				<!-- Title -->
				{#if isEditing}
					<input
						type="text"
						bind:value={editedTitle}
						onkeydown={handleEditKeydown}
						onblur={saveEdit}
						class="input input-sm input-bordered w-full"
						autofocus
					/>
				{:else}
					<h3
						class="cursor-pointer text-lg font-medium"
						class:line-through={todo.completed}
						ondblclick={startEdit}
						role="button"
						tabindex="0"
						onkeydown={(e) => e.key === 'Enter' && startEdit()}
					>
						{todo.title}
					</h3>
				{/if}

				<!-- Badges and Meta -->
				<div class="flex flex-wrap items-center gap-2">
					<!-- Priority Badge -->
					<span class="badge {priorityColors[todo.priority]} badge-sm">
						{todo.priority}
					</span>

					<!-- Category Badge -->
					{#if todo.category}
						<span class="badge badge-ghost badge-sm">
							{todo.category}
						</span>
					{/if}

					<!-- Due Date Badge -->
					{#if todo.dueDate}
						<span
							class="badge badge-sm"
							class:badge-error={isOverdue(todo.dueDate)}
							class:badge-outline={!isOverdue(todo.dueDate)}
						>
							📅 {formatDueDate(todo.dueDate)}
						</span>
					{/if}
				</div>

				<!-- Subtasks Toggle -->
				{#if todo.subtasks && todo.subtasks.length > 0}
					<button
						class="btn btn-ghost btn-xs"
						onclick={() => (showSubtasks = !showSubtasks)}
					>
						{showSubtasks ? '▼' : '▶'}
						Subtasks ({todo.subtasks.length})
					</button>
				{/if}

				<!-- Subtasks List -->
				{#if showSubtasks && todo.subtasks}
					<div class="ml-4 mt-2">
						<SubtaskList bind:subtasks={todo.subtasks} />
					</div>
				{/if}
			</div>

			<!-- Actions -->
			<div class="flex flex-col gap-1">
				<!-- Edit Button -->
				{#if !isEditing}
					<button
						class="btn btn-ghost btn-sm btn-square"
						onclick={startEdit}
						title="Edit todo"
					>
						✏️
					</button>
				{/if}

				<!-- Delete Button -->
				<button
					class="btn btn-ghost btn-sm btn-square text-error"
					onclick={onDelete}
					title="Delete todo"
				>
					🗑️
				</button>
			</div>
		</div>
	</div>
</div>
