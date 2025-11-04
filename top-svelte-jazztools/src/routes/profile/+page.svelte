<script lang="ts">
	import { authStore } from '$lib/auth';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	// Mock user profile data
	let profileData = $state({
		displayName: 'Demo User',
		email: authStore.user?.email || 'demo@example.com',
		bio: 'This is a mock profile showcasing the profile page functionality. Ready to connect to your backend!',
		location: 'San Francisco, CA',
		website: 'https://example.com',
		joinDate: 'January 2024',
		stats: {
			posts: 42,
			followers: 1234,
			following: 567
		}
	});

	let isEditing = $state(false);
	let saveMessage = $state('');
	let tempData = $state({
		displayName: '',
		email: '',
		bio: '',
		location: '',
		website: '',
		joinDate: '',
		stats: { posts: 0, followers: 0, following: 0 }
	});

	// Redirect if not authenticated
	onMount(() => {
		if (!authStore.isAuthenticated) {
			goto('/');
		}
	});

	function startEdit() {
		isEditing = true;
		tempData = { ...profileData };
		saveMessage = '';
	}

	function cancelEdit() {
		isEditing = false;
		tempData = { ...profileData };
	}

	function saveProfile() {
		profileData = { ...tempData };
		isEditing = false;
		saveMessage = '✓ Profile updated successfully!';
		setTimeout(() => {
			saveMessage = '';
		}, 3000);
	}
</script>

{#if authStore.isAuthenticated}
	<div class="container mx-auto max-w-4xl px-4 py-8">
		<!-- Profile Header -->
		<div class="mb-8 rounded-lg border border-base-300 bg-base-100 p-6 shadow-md">
			<div class="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
				<!-- Avatar -->
				<div class="avatar placeholder">
					<div class="w-24 rounded-full bg-primary text-primary-content">
						<span class="text-3xl">{profileData.displayName.charAt(0).toUpperCase()}</span>
					</div>
				</div>

				<!-- User Info -->
				<div class="flex-1">
					<h1 class="text-3xl font-bold">{profileData.displayName}</h1>
					<p class="text-base-content/70">{profileData.email}</p>
					<p class="mt-2 text-sm text-base-content/60">Member since {profileData.joinDate}</p>
				</div>

				<!-- Edit Button -->
				{#if !isEditing}
					<button onclick={startEdit} class="btn btn-primary btn-sm">
						Edit Profile
					</button>
				{/if}
			</div>
		</div>

		<!-- Stats -->
		<div class="mb-8 grid grid-cols-3 gap-4">
			<div class="rounded-lg border border-base-300 bg-base-100 p-4 text-center shadow-sm">
				<div class="text-3xl font-bold text-primary">{profileData.stats.posts}</div>
				<div class="text-sm text-base-content/60">Posts</div>
			</div>
			<div class="rounded-lg border border-base-300 bg-base-100 p-4 text-center shadow-sm">
				<div class="text-3xl font-bold text-secondary">{profileData.stats.followers}</div>
				<div class="text-sm text-base-content/60">Followers</div>
			</div>
			<div class="rounded-lg border border-base-300 bg-base-100 p-4 text-center shadow-sm">
				<div class="text-3xl font-bold text-accent">{profileData.stats.following}</div>
				<div class="text-sm text-base-content/60">Following</div>
			</div>
		</div>

		<!-- Profile Details / Edit Form -->
		<div class="rounded-lg border border-base-300 bg-base-100 p-6 shadow-md">
			<h2 class="mb-4 text-2xl font-semibold">Profile Details</h2>

			{#if saveMessage}
				<div class="mb-4 rounded-lg border border-success bg-success/10 p-3 text-sm text-success">
					{saveMessage}
				</div>
			{/if}

			{#if isEditing}
				<!-- Edit Form -->
				<form onsubmit={(e) => { e.preventDefault(); saveProfile(); }} class="space-y-4">
					<div>
						<label for="displayName" class="mb-1 block text-sm font-medium">
							Display Name
						</label>
						<input
							id="displayName"
							type="text"
							bind:value={tempData.displayName}
							class="input input-bordered w-full"
							required
						/>
					</div>

					<div>
						<label for="email" class="mb-1 block text-sm font-medium">
							Email
						</label>
						<input
							id="email"
							type="email"
							bind:value={tempData.email}
							class="input input-bordered w-full"
							required
						/>
					</div>

					<div>
						<label for="bio" class="mb-1 block text-sm font-medium">
							Bio
						</label>
						<textarea
							id="bio"
							bind:value={tempData.bio}
							class="textarea textarea-bordered w-full"
							rows="4"
						></textarea>
					</div>

					<div>
						<label for="location" class="mb-1 block text-sm font-medium">
							Location
						</label>
						<input
							id="location"
							type="text"
							bind:value={tempData.location}
							class="input input-bordered w-full"
						/>
					</div>

					<div>
						<label for="website" class="mb-1 block text-sm font-medium">
							Website
						</label>
						<input
							id="website"
							type="url"
							bind:value={tempData.website}
							class="input input-bordered w-full"
						/>
					</div>

					<div class="flex gap-3">
						<button type="submit" class="btn btn-primary">
							Save Changes
						</button>
						<button type="button" onclick={cancelEdit} class="btn btn-ghost">
							Cancel
						</button>
					</div>
				</form>
			{:else}
				<!-- View Mode -->
				<div class="space-y-4">
					<div>
						<div class="text-sm font-medium text-base-content/60">Bio</div>
						<p class="mt-1">{profileData.bio}</p>
					</div>

					<div>
						<div class="text-sm font-medium text-base-content/60">Location</div>
						<p class="mt-1">{profileData.location}</p>
					</div>

					<div>
						<div class="text-sm font-medium text-base-content/60">Website</div>
						<a
							href={profileData.website}
							target="_blank"
							rel="noopener noreferrer"
							class="mt-1 text-primary hover:underline"
						>
							{profileData.website}
						</a>
					</div>
				</div>
			{/if}
		</div>

		<!-- Mock Activity Section -->
		<div class="mt-8 rounded-lg border border-base-300 bg-base-100 p-6 shadow-md">
			<h2 class="mb-4 text-2xl font-semibold">Recent Activity</h2>
			<div class="space-y-3">
				<div class="flex items-center gap-3 rounded-lg border border-base-200 p-3">
					<div class="text-2xl">📝</div>
					<div class="flex-1">
						<div class="font-medium">Published a new post</div>
						<div class="text-sm text-base-content/60">2 hours ago</div>
					</div>
				</div>
				<div class="flex items-center gap-3 rounded-lg border border-base-200 p-3">
					<div class="text-2xl">👤</div>
					<div class="flex-1">
						<div class="font-medium">Followed 3 new users</div>
						<div class="text-sm text-base-content/60">1 day ago</div>
					</div>
				</div>
				<div class="flex items-center gap-3 rounded-lg border border-base-200 p-3">
					<div class="text-2xl">⭐</div>
					<div class="flex-1">
						<div class="font-medium">Liked 15 posts</div>
						<div class="text-sm text-base-content/60">3 days ago</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Note about mock data -->
		<div class="alert alert-info mt-8">
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
			<span
				>This is a mock profile page. All data is stored locally and will reset on page reload.
				Ready to connect to your backend!</span
			>
		</div>
	</div>
{:else}
	<div class="flex min-h-screen items-center justify-center">
		<div class="text-center">
			<h1 class="mb-4 text-2xl font-bold">Please log in to view your profile</h1>
			<a href="/" class="btn btn-primary">Go to Home</a>
		</div>
	</div>
{/if}
