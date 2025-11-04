<script lang="ts">
	import { authStore } from '$lib/auth';
	import { m } from '$lib/i18n/messages';
	import { locale } from '$lib/stores/locale.store';
	import AddTodo from '$lib/components/todos/AddTodo.svelte';
	import TodoList from '$lib/components/todos/TodoList.svelte';

	// Force reactivity: messages will re-evaluate when locale changes
	$: currentLocale = $locale;
</script>

<div class="container mx-auto max-w-6xl px-4 py-8" lang={$locale}>
	{#key $locale}
		<div class="py-8">
			<div class="mb-8 text-center">
				<h1 class="mb-4 text-4xl font-bold">{m.home_title()}</h1>
				<p class="mb-4 text-lg text-base-content/70">
					{m.home_subtitle()}
				</p>
			</div>

			{#if authStore.isAuthenticated}
				<!-- Todo Application -->
				<div class="space-y-6">
					<!-- Welcome Message -->
					<div class="rounded-lg border border-success bg-success/10 p-4 text-center">
						<p class="text-base-content/70">
							Welcome back, <span class="font-medium">{authStore.user?.email}</span>! 🎉
						</p>
						<p class="mt-2 text-sm text-base-content/60">
							Your todos sync in real-time across all your devices via Jazz.tools
						</p>
					</div>

					<!-- Add Todo Form -->
					<AddTodo />

					<!-- Todo List -->
					<TodoList />
				</div>
			{:else}
				<!-- Not Logged In State -->
				<div class="mt-12 rounded-lg border border-base-300 bg-base-200 p-6 text-center">
					<h2 class="mb-2 text-2xl font-semibold">{m.home_get_started_title()}</h2>
					<p class="text-base-content/70">
						{m.home_get_started_description()}
					</p>
					<p class="mt-4 text-sm text-base-content/60">
						{m.home_get_started_note()}
					</p>
				</div>

				<!-- Features Grid -->
				<div class="mt-12 grid gap-6 md:grid-cols-2">
					<div class="rounded-lg border border-base-300 bg-base-100 p-6">
						<h3 class="mb-2 text-xl font-semibold">{m.home_features_title()}</h3>
						<ul class="space-y-2 text-base-content/70">
							<li>• {m.home_features_sveltekit()}</li>
							<li>• {m.home_features_tailwind()}</li>
							<li>• {m.home_features_auth()}</li>
							<li>• {m.home_features_typescript()}</li>
							<li>• Jazz.tools for real-time sync</li>
						</ul>
					</div>

					<div class="rounded-lg border border-base-300 bg-base-100 p-6">
						<h3 class="mb-2 text-xl font-semibold">Jazz.tools Features</h3>
						<ul class="space-y-2 text-base-content/70">
							<li>• Real-time collaboration</li>
							<li>• Offline-first architecture</li>
							<li>• End-to-end encryption</li>
							<li>• Automatic conflict resolution</li>
							<li>• Cross-device sync</li>
						</ul>
					</div>
				</div>
			{/if}
		</div>
	{/key}
</div>
