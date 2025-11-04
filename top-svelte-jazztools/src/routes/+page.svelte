<script lang="ts">
	import { m } from '$lib/i18n/messages';
	import { locale } from '$lib/stores/locale.store';
	import AddTodo from '$lib/components/todos/AddTodo.svelte';
	import TodoList from '$lib/components/todos/TodoList.svelte';
	import { AccountCoState } from 'jazz-tools/svelte';
	import { TodoAccount } from '$lib/jazz/schema';

	// Force reactivity: messages will re-evaluate when locale changes
	$: currentLocale = $locale;

	// Jazz account state
	const me = new AccountCoState(TodoAccount);
</script>

<div class="container mx-auto max-w-6xl px-4 py-8" lang={$locale}>
	{#key $locale}
		<div class="py-8">
			<div class="mb-8 text-center">
				<h1 class="mb-4 text-4xl font-bold">Jazz Todo App</h1>
				<p class="mb-4 text-lg text-base-content/70">
					Real-time collaborative todos with offline support
				</p>
			</div>

			{#if me.current}
				<!-- Todo Application -->
				<div class="space-y-6">
					<!-- Welcome Message -->
					<div class="rounded-lg border border-success bg-success/10 p-4 text-center">
						<p class="text-base-content/70">
							Welcome, <span class="font-medium">{me.current.profile?.name || 'Jazz User'}</span>! 🎉
						</p>
						<p class="mt-2 text-sm text-base-content/60">
							Your todos sync in real-time across all your devices. Open this app in multiple tabs to see the magic! ⚡
						</p>
					</div>

					<!-- Add Todo Form -->
					<AddTodo />

					<!-- Todo List -->
					<TodoList />
				</div>
			{:else}
				<!-- Loading Jazz Account -->
				<div class="rounded-lg border border-base-300 bg-base-200 p-12 text-center">
					<span class="loading loading-spinner loading-lg"></span>
					<p class="mt-4 text-lg font-semibold">Setting up your Jazz account...</p>
					<p class="mt-2 text-sm text-base-content/60">
						Jazz will ask you to create an account or log into an existing one
					</p>
				</div>

				<!-- Features Grid -->
				<div class="mt-12 grid gap-6 md:grid-cols-2">
					<div class="rounded-lg border border-base-300 bg-base-100 p-6">
						<h3 class="mb-2 text-xl font-semibold">Core Features</h3>
						<ul class="space-y-2 text-base-content/70">
							<li>• Add, edit, delete todos</li>
							<li>• Priority levels & due dates</li>
							<li>• Categories & subtasks</li>
							<li>• Filter by status</li>
							<li>• Beautiful DaisyUI design</li>
						</ul>
					</div>

					<div class="rounded-lg border border-base-300 bg-base-100 p-6">
						<h3 class="mb-2 text-xl font-semibold">Jazz.tools Magic</h3>
						<ul class="space-y-2 text-base-content/70">
							<li>• Real-time sync across devices</li>
							<li>• Offline-first architecture</li>
							<li>• End-to-end encryption</li>
							<li>• Automatic conflict resolution</li>
							<li>• No backend code needed</li>
						</ul>
					</div>
				</div>
			{/if}
		</div>
	{/key}
</div>
