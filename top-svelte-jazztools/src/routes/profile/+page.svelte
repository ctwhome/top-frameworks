<script lang="ts">
	import { AccountCoState } from 'jazz-tools/svelte';
	import { TodoAccount } from '$lib/jazz/schema';
	import { goto } from '$app/navigation';
	import toast from 'svelte-french-toast';
	import { authClient } from '$lib/auth/auth-client';

	// Better Auth session (for user display)
	const session = authClient.useSession();
	let user = $derived($session.data?.user);

	// Jazz account state (for todo data)
	const me = new AccountCoState(TodoAccount, {
		resolve: { root: { todos: true }, profile: true }
	});

	let isEditing = $state(false);
	let editName = $state('');

	function startEdit() {
		if (me.current?.profile) {
			editName = me.current.profile.name || '';
			isEditing = true;
		}
	}

	function cancelEdit() {
		isEditing = false;
		editName = '';
	}

	function saveProfile() {
		if (!me.current?.profile) return;

		try {
			me.current.profile.$jazz.set('name', editName.trim() || 'Jazz User');
			isEditing = false;
			toast.success('Profile updated!');
		} catch (error) {
			console.error('Failed to update profile:', error);
			toast.error('Failed to update profile');
		}
	}

	// Compute todo stats
	let todoStats = $derived(() => {
		const todos = me.current?.root.todos || [];
		const validTodos = todos.filter((t) => t != null);
		return {
			total: validTodos.length,
			completed: validTodos.filter((t) => t.completed).length,
			active: validTodos.filter((t) => !t.completed).length
		};
	});
</script>

{#if me.current}
	<div class="container mx-auto max-w-4xl px-4 py-8">
		<!-- Profile Header -->
		<div class="mb-8 rounded-lg border border-base-300 bg-base-100 p-6 shadow-md">
			<div class="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
				<!-- Avatar -->
				{#if user?.image}
					<div class="avatar">
						<div class="w-24 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
							<img src={user.image} alt={user.name || 'User'} />
						</div>
					</div>
				{:else}
					<div class="avatar placeholder">
						<div class="w-24 rounded-full bg-primary text-primary-content">
							<span class="text-3xl">
								{user?.name?.charAt(0)?.toUpperCase() || me.current.profile?.name?.charAt(0)?.toUpperCase() || 'U'}
							</span>
						</div>
					</div>
				{/if}

				<!-- User Info -->
				<div class="flex-1">
					{#if user}
						<!-- Authenticated with Better Auth -->
						<h1 class="text-3xl font-bold">{user.name || 'User'}</h1>
						<p class="text-base-content/70">{user.email}</p>
						<div class="mt-2 flex items-center gap-2">
							<span class="badge badge-success badge-sm">Google Account</span>
							<span class="badge badge-info badge-sm">Synced</span>
						</div>
					{:else if isEditing}
						<input
							type="text"
							bind:value={editName}
							class="input input-bordered mb-2 w-full max-w-xs"
							placeholder="Your name"
						/>
						<div class="mt-2 flex gap-2">
							<button class="btn btn-primary btn-sm" onclick={saveProfile}>Save</button>
							<button class="btn btn-ghost btn-sm" onclick={cancelEdit}>Cancel</button>
						</div>
					{:else}
						<h1 class="text-3xl font-bold">{me.current.profile?.name || 'Anonymous User'}</h1>
						<p class="text-base-content/70">Local Jazz Account</p>
						<button class="btn btn-ghost btn-sm mt-2" onclick={startEdit}>Edit Name</button>
					{/if}
				</div>
			</div>
		</div>

		<!-- Todo Stats -->
		<div class="mb-8 grid gap-6 md:grid-cols-3">
			<div class="stat rounded-lg border border-base-300 bg-base-100 shadow">
				<div class="stat-figure text-primary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block h-8 w-8 stroke-current"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
						></path>
					</svg>
				</div>
				<div class="stat-title">Total Todos</div>
				<div class="stat-value text-primary">{todoStats().total}</div>
			</div>

			<div class="stat rounded-lg border border-base-300 bg-base-100 shadow">
				<div class="stat-figure text-secondary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block h-8 w-8 stroke-current"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						></path>
					</svg>
				</div>
				<div class="stat-title">Completed</div>
				<div class="stat-value text-secondary">{todoStats().completed}</div>
			</div>

			<div class="stat rounded-lg border border-base-300 bg-base-100 shadow">
				<div class="stat-figure text-accent">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block h-8 w-8 stroke-current"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 10V3L4 14h7v7l9-11h-7z"
						></path>
					</svg>
				</div>
				<div class="stat-title">Active</div>
				<div class="stat-value text-accent">{todoStats().active}</div>
			</div>
		</div>

		<!-- Account Info -->
		<div class="rounded-lg border border-base-300 bg-base-100 p-6 shadow-md">
			<h2 class="mb-4 text-2xl font-bold">Account Details</h2>
			<div class="space-y-4">
				{#if user}
					<div>
						<h3 class="text-sm font-semibold text-base-content/70">Authentication</h3>
						<p class="text-sm">Google OAuth via Better Auth</p>
					</div>
				{/if}

				<div>
					<h3 class="text-sm font-semibold text-base-content/70">Jazz Account ID</h3>
					<p class="font-mono text-xs break-all">{me.current.$jazz.id}</p>
				</div>

				<div class="divider"></div>

				<div>
					<h3 class="mb-2 text-lg font-semibold">Features</h3>
					<ul class="space-y-2 text-base-content/70">
						<li>✅ Real-time sync across devices</li>
						<li>✅ Offline-first with automatic sync</li>
						<li>✅ End-to-end encryption</li>
						<li>✅ Automatic conflict resolution</li>
						<li>✅ No backend code needed</li>
					</ul>
				</div>

				<div class="divider"></div>

				{#if user}
					<div class="alert alert-success">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							class="h-6 w-6 shrink-0 stroke-current"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							></path>
						</svg>
						<div>
							<h3 class="font-bold">Connected to Google</h3>
							<div class="text-xs">
								Your data syncs across all devices where you sign in with this Google account.
							</div>
						</div>
					</div>
				{:else}
					<div class="alert alert-info">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							class="h-6 w-6 shrink-0 stroke-current"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							></path>
						</svg>
						<div>
							<h3 class="font-bold">Sign in for Cross-Device Sync</h3>
							<div class="text-xs">
								Sign in with Google to sync your todos across all your devices.
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
{:else}
	<div class="container mx-auto max-w-4xl px-4 py-8">
		<div class="rounded-lg border border-base-300 bg-base-200 p-12 text-center">
			<span class="loading loading-spinner loading-lg"></span>
			<p class="mt-4 text-lg">Loading your profile...</p>
		</div>
	</div>
{/if}
