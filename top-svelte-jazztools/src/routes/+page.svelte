<script lang="ts">
	import { authStore } from '$lib/auth';
	import { m } from '$lib/i18n/messages';
	import { locale } from '$lib/stores/locale.store';

	// Force reactivity: messages will re-evaluate when locale changes
	$: currentLocale = $locale;
</script>

<div class="container mx-auto max-w-4xl px-4 py-8" lang={$locale}>
	{#key $locale}
	<div class="py-12">
		<div class="text-center">
			<h1 class="mb-4 text-4xl font-bold">{m.home_title()}</h1>
			<p class="mb-8 text-lg text-base-content/70">
				{m.home_subtitle()}
			</p>
		</div>

		{#if authStore.isAuthenticated}
			<div class="mt-12 rounded-lg border border-success bg-success/10 p-6 text-center">
				<h2 class="mb-2 text-2xl font-semibold text-success">{m.home_logged_in_title()}</h2>
				<p class="text-base-content/70">
					{m.home_logged_in_email()} <span class="font-medium">{authStore.user?.email}</span>
				</p>
				<p class="mt-4 text-sm text-base-content/60">
					{m.home_logged_in_subtitle()}
				</p>
			</div>
		{:else}
			<div class="mt-12 rounded-lg border border-base-300 bg-base-200 p-6 text-center">
				<h2 class="mb-2 text-2xl font-semibold">{m.home_get_started_title()}</h2>
				<p class="text-base-content/70">
					{m.home_get_started_description()}
				</p>
				<p class="mt-4 text-sm text-base-content/60">
					{m.home_get_started_note()}
				</p>
			</div>
		{/if}

		<div class="mt-12 grid gap-6 md:grid-cols-2">
			<div class="rounded-lg border border-base-300 bg-base-100 p-6">
				<h3 class="mb-2 text-xl font-semibold">{m.home_features_title()}</h3>
				<ul class="space-y-2 text-base-content/70">
					<li>• {m.home_features_sveltekit()}</li>
					<li>• {m.home_features_tailwind()}</li>
					<li>• {m.home_features_auth()}</li>
					<li>• {m.home_features_typescript()}</li>
					<li>• {m.home_features_docker()}</li>
				</ul>
			</div>

			<div class="rounded-lg border border-base-300 bg-base-100 p-6">
				<h3 class="mb-2 text-xl font-semibold">{m.home_integration_title()}</h3>
				<ul class="space-y-2 text-base-content/70">
					<li>• {m.home_integrations_supabase()}</li>
					<li>• {m.home_integrations_firebase()}</li>
					<li>• {m.home_integrations_pocketbase()}</li>
					<li>• {m.home_integrations_custom()}</li>
					<li>• {m.home_integrations_any()}</li>
				</ul>
			</div>
		</div>
	</div>
	{/key}
</div>
