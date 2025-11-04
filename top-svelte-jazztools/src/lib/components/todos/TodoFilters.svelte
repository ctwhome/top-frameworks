<script lang="ts">
	/**
	 * TodoFilters Component
	 *
	 * Filter controls for todo list:
	 * - All todos
	 * - Active (incomplete) todos
	 * - Completed todos
	 * - Display todo count
	 */

	interface Props {
		filter: 'all' | 'active' | 'completed';
		onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
		totalCount: number;
		activeCount: number;
		completedCount: number;
	}

	let { filter, onFilterChange, totalCount, activeCount, completedCount }: Props = $props();
</script>

<div class="card bg-base-100 shadow-md">
	<div class="card-body p-4">
		<div class="flex flex-wrap items-center justify-between gap-4">
			<!-- Filter Buttons -->
			<div class="btn-group">
				<button
					class="btn btn-sm"
					class:btn-active={filter === 'all'}
					onclick={() => onFilterChange('all')}
				>
					All ({totalCount})
				</button>
				<button
					class="btn btn-sm"
					class:btn-active={filter === 'active'}
					onclick={() => onFilterChange('active')}
				>
					Active ({activeCount})
				</button>
				<button
					class="btn btn-sm"
					class:btn-active={filter === 'completed'}
					onclick={() => onFilterChange('completed')}
				>
					Completed ({completedCount})
				</button>
			</div>

			<!-- Stats -->
			<div class="text-sm text-base-content/70">
				{#if activeCount > 0}
					<span class="font-medium">{activeCount}</span>
					{activeCount === 1 ? 'item' : 'items'} left
				{:else}
					All done! 🎉
				{/if}
			</div>
		</div>
	</div>
</div>
