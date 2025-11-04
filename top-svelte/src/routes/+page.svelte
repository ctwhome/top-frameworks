<script lang="ts">
	import { authStore } from '$lib/auth';
</script>

<div class="container mx-auto max-w-4xl px-4 py-8">
	<div class="py-12">
		<div class="text-center">
			<h1 class="mb-4 text-4xl font-bold">Welcome to Top Svelte!</h1>
			<p class="mb-8 text-lg text-base-content/70">
				A modern SvelteKit starter template ready for your backend integration
			</p>
		</div>

		{#if authStore.isAuthenticated}
			<div class="mt-12 rounded-lg border border-success bg-success/10 p-6 text-center">
				<h2 class="mb-2 text-2xl font-semibold text-success">You're logged in!</h2>
				<p class="text-base-content/70">
					Email: <span class="font-medium">{authStore.user?.email}</span>
				</p>
				<p class="mt-4 text-sm text-base-content/60">
					This is a mock authentication. Ready to connect your favorite backend!
				</p>
			</div>
		{:else}
			<div class="mt-12 rounded-lg border border-base-300 bg-base-200 p-6 text-center">
				<h2 class="mb-2 text-2xl font-semibold">Get Started</h2>
				<p class="text-base-content/70">
					Click the Login button in the header to try the authentication UI
				</p>
				<p class="mt-4 text-sm text-base-content/60">
					Mock auth accepts any email/password (8+ characters)
				</p>
			</div>
		{/if}

		<div class="mt-12 grid gap-6 md:grid-cols-2">
			<div class="rounded-lg border border-base-300 bg-base-100 p-6">
				<h3 class="mb-2 text-xl font-semibold">✨ Features</h3>
				<ul class="space-y-2 text-base-content/70">
					<li>• SvelteKit 2 with Svelte 5</li>
					<li>• TailwindCSS 4 + DaisyUI</li>
					<li>• Backend-agnostic auth interface</li>
					<li>• TypeScript support</li>
					<li>• Docker Compose ready</li>
				</ul>
			</div>

			<div class="rounded-lg border border-base-300 bg-base-100 p-6">
				<h3 class="mb-2 text-xl font-semibold">🔌 Ready for Integration</h3>
				<ul class="space-y-2 text-base-content/70">
					<li>• Supabase</li>
					<li>• Firebase</li>
					<li>• PocketBase</li>
					<li>• Custom APIs</li>
					<li>• Any BaaS solution</li>
				</ul>
			</div>
		</div>
	</div>
</div>
