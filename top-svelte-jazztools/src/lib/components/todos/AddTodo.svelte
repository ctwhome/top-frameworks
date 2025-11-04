<script lang="ts">
	/**
	 * AddTodo Component
	 *
	 * Form to create new todo items with all features:
	 * - Title (required)
	 * - Priority (low, medium, high)
	 * - Due date (optional)
	 * - Category/tag (optional)
	 *
	 * Automatically syncs to Jazz Cloud in real-time.
	 */
	import { AccountCoState } from 'jazz-tools/svelte';
	import { TodoAccount, Todo } from '$lib/jazz/schema';
	import toast from 'svelte-french-toast';

	const me = new AccountCoState(TodoAccount, {
		resolve: { root: { todos: true } }
	});

	// Form state
	let title = $state('');
	let priority = $state<'low' | 'medium' | 'high'>('medium');
	let dueDate = $state('');
	let category = $state('');
	let isSubmitting = $state(false);

	async function handleSubmit() {
		if (!title.trim()) {
			toast.error('Please enter a todo title');
			return;
		}

		if (!me.current?.root.todos) {
			toast.error('Unable to add todo. Please try again.');
			return;
		}

		isSubmitting = true;

		try {
			// Create new todo with Jazz
			const newTodo = Todo.create({
				title: title.trim(),
				completed: false,
				priority,
				dueDate: dueDate ? new Date(dueDate) : undefined,
				category: category.trim() || undefined,
				createdAt: new Date(),
				subtasks: [] // Empty subtasks list
			});

			// Add to todos list - Jazz automatically syncs!
			me.current.root.todos.$jazz.push(newTodo);

			// Reset form
			title = '';
			priority = 'medium';
			dueDate = '';
			category = '';

			toast.success('Todo added successfully!');
		} catch (error) {
			console.error('Failed to add todo:', error);
			toast.error('Failed to add todo. Please try again.');
		} finally {
			isSubmitting = false;
		}
	}

	// Handle Enter key in title input
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			handleSubmit();
		}
	}
</script>

<div class="card bg-base-100 shadow-md">
	<div class="card-body">
		<h2 class="card-title text-lg">Add New Todo</h2>

		<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-4">
			<!-- Title Input -->
			<div class="form-control">
				<label class="label" for="title">
					<span class="label-text">Title</span>
					<span class="label-text-alt text-error">*</span>
				</label>
				<input
					id="title"
					type="text"
					bind:value={title}
					onkeydown={handleKeydown}
					placeholder="What needs to be done?"
					class="input input-bordered w-full"
					disabled={isSubmitting}
					required
				/>
			</div>

			<!-- Priority and Due Date Row -->
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<!-- Priority Select -->
				<div class="form-control">
					<label class="label" for="priority">
						<span class="label-text">Priority</span>
					</label>
					<select
						id="priority"
						bind:value={priority}
						class="select select-bordered w-full"
						disabled={isSubmitting}
					>
						<option value="low">Low</option>
						<option value="medium">Medium</option>
						<option value="high">High</option>
					</select>
				</div>

				<!-- Due Date Input -->
				<div class="form-control">
					<label class="label" for="dueDate">
						<span class="label-text">Due Date</span>
					</label>
					<input
						id="dueDate"
						type="date"
						bind:value={dueDate}
						class="input input-bordered w-full"
						disabled={isSubmitting}
					/>
				</div>
			</div>

			<!-- Category Input -->
			<div class="form-control">
				<label class="label" for="category">
					<span class="label-text">Category</span>
				</label>
				<input
					id="category"
					type="text"
					bind:value={category}
					placeholder="e.g., Work, Personal, Shopping"
					class="input input-bordered w-full"
					disabled={isSubmitting}
				/>
			</div>

			<!-- Submit Button -->
			<div class="card-actions justify-end">
				<button
					type="submit"
					class="btn btn-primary"
					disabled={isSubmitting || !title.trim()}
				>
					{#if isSubmitting}
						<span class="loading loading-spinner loading-sm"></span>
						Adding...
					{:else}
						Add Todo
					{/if}
				</button>
			</div>
		</form>
	</div>
</div>
