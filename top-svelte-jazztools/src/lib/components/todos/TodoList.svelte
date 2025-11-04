<script lang="ts">
	/**
	 * TodoList Component
	 *
	 * Main todo list container that:
	 * - Fetches todos from Jazz
	 * - Handles filtering (all/active/completed)
	 * - Displays todos with TodoItem components
	 * - Shows empty states
	 * - Manages delete operations
	 *
	 * All data syncs automatically in real-time via Jazz!
	 */
	import { AccountCoState } from 'jazz-tools/svelte';
	import { TodoAccount } from '$lib/jazz/schema';
	import TodoItem from './TodoItem.svelte';
	import TodoFilters from './TodoFilters.svelte';
	import toast from 'svelte-french-toast';

	const me = new AccountCoState(TodoAccount, {
		resolve: { root: { todos: true } }
	});

	let filter = $state<'all' | 'active' | 'completed'>('all');

	// Filter todos based on current filter
	let filteredTodos = $derived(() => {
		const todos = me.current?.root.todos || [];
		// Filter out null/undefined items that might be loading
		const validTodos = todos.filter((todo) => todo != null);

		switch (filter) {
			case 'active':
				return validTodos.filter((todo) => !todo.completed);
			case 'completed':
				return validTodos.filter((todo) => todo.completed);
			default:
				return validTodos;
		}
	});

	// Compute todo counts
	let todoStats = $derived(() => {
		const todos = me.current?.root.todos || [];
		// Filter out null/undefined items
		const validTodos = todos.filter((todo) => todo != null);
		return {
			total: validTodos.length,
			active: validTodos.filter((todo) => !todo.completed).length,
			completed: validTodos.filter((todo) => todo.completed).length
		};
	});

	// Delete todo handler
	function deleteTodo(index: number) {
		if (!me.current?.root.todos) return;

		const todoTitle = me.current.root.todos[index]?.title;

		try {
			me.current.root.todos.$jazz.splice(index, 1);
			toast.success(`"${todoTitle}" deleted`);
		} catch (error) {
			console.error('Failed to delete todo:', error);
			toast.error('Failed to delete todo');
		}
	}
</script>

<div class="space-y-4">
	<!-- Filters -->
	{#if me.current?.root.todos && me.current.root.todos.filter((t) => t != null).length > 0}
		<TodoFilters
			{filter}
			onFilterChange={(newFilter) => (filter = newFilter)}
			totalCount={todoStats().total}
			activeCount={todoStats().active}
			completedCount={todoStats().completed}
		/>
	{/if}

	<!-- Loading State -->
	{#if !me.current}
		<div class="card bg-base-100 shadow-md">
			<div class="card-body items-center justify-center p-12">
				<span class="loading loading-spinner loading-lg"></span>
				<p class="mt-4 text-base-content/70">Loading your todos...</p>
			</div>
		</div>
	{:else if !me.current.root.todos || me.current.root.todos.filter((t) => t != null).length === 0}
		<!-- Empty State -->
		<div class="card bg-base-100 shadow-md">
			<div class="card-body items-center justify-center p-12">
				<div class="text-center">
					<div class="mb-4 text-6xl">📝</div>
					<h3 class="mb-2 text-xl font-semibold">No todos yet</h3>
					<p class="text-base-content/70">Add your first todo to get started!</p>
				</div>
			</div>
		</div>
	{:else}
		<!-- Todo List -->
		<div class="space-y-3">
			{#if filteredTodos().length === 0}
				<!-- Empty Filter State -->
				<div class="card bg-base-100 shadow-md">
					<div class="card-body items-center justify-center p-12">
						<div class="text-center">
							<div class="mb-4 text-6xl">
								{#if filter === 'active'}
									✅
								{:else if filter === 'completed'}
									📋
								{/if}
							</div>
							<h3 class="mb-2 text-xl font-semibold">
								{#if filter === 'active'}
									All caught up!
								{:else if filter === 'completed'}
									No completed todos
								{/if}
							</h3>
							<p class="text-base-content/70">
								{#if filter === 'active'}
									You don't have any active todos. Time to relax! 🎉
								{:else if filter === 'completed'}
									Complete some todos to see them here.
								{/if}
							</p>
						</div>
					</div>
				</div>
			{:else}
				{#each filteredTodos() as todo, index (todo.$jazz.id)}
					<TodoItem
						{todo}
						onDelete={() => {
							// Find the actual index in the full list
							const actualIndex = me.current?.root.todos?.findIndex(
								(t) => t != null && t.$jazz.id === todo.$jazz.id
							);
							if (actualIndex !== undefined && actualIndex !== -1) {
								deleteTodo(actualIndex);
							}
						}}
					/>
				{/each}
			{/if}
		</div>
	{/if}
</div>
