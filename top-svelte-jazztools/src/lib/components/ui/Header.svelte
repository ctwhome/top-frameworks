<script lang="ts">
	import Logo from '$lib/assets/icons/Logo.svelte';
	import FeedbackButton from '$lib/components/ui/feedback/FeedbackButton.svelte';
	import LanguageSwitcher from '$lib/components/ui/LanguageSwitcher.svelte';
	import { toggleMenu } from '$lib/stores/menu.store';
	import IconamoonMenuBurgerHorizontalBold from '~icons/iconamoon/menu-burger-horizontal-bold';
	import menuItems from '$lib/models/menu-itmes';
	import ThemeChange from '$lib/components/ui/ThemeChange/ThemeChange.svelte';
	import LoginModal from '$lib/components/ui/LoginModal.svelte';
	import { authClient } from '$lib/auth/auth-client';

	let activeCategory = $state('');
	let isLoggingOut = $state(false);
	let showLoginModal = $state(false);

	// Better Auth session (reactive Svelte store)
	const session = authClient.useSession();

	// Check if user is authenticated via Better Auth
	let isAuthenticated = $derived($session.data?.user != null);
	let user = $derived($session.data?.user);

	async function handleLogout() {
		if (typeof window === 'undefined') return;

		isLoggingOut = true;

		try {
			// Sign out from Better Auth
			await authClient.signOut();

			// Clear Jazz local data
			const keysToRemove: string[] = [];
			for (let i = 0; i < localStorage.length; i++) {
				const key = localStorage.key(i);
				if (key) keysToRemove.push(key);
			}
			keysToRemove.forEach((key) => localStorage.removeItem(key));

			// Clear IndexedDB databases used by Jazz
			const databases = await window.indexedDB.databases();
			for (const db of databases) {
				if (db.name) window.indexedDB.deleteDatabase(db.name);
			}

			// Reload page
			setTimeout(() => {
				window.location.href = '/';
			}, 200);
		} catch (error) {
			console.error('Logout error:', error);
			window.location.href = '/';
		}
	}
</script>

<nav class="bien-nav mb-10">
	<div class="bien-glass"></div>
	<div class="bien-glass-edge"></div>
	<div class="relative container mx-auto py-2 sm:px-4">
		<!--Desktop Header-->
		<header class="flex items-center gap-3 px-2 sm:px-0">
			<button
				class="rounded-md p-2 transition-colors duration-200 hover:bg-base-200 sm:hidden"
				onclick={toggleMenu}
				aria-label="Open menu"
			>
				<IconamoonMenuBurgerHorizontalBold class="size-6" />
			</button>
			<a
				class="no-drag mr-3 h-auto w-30 sm:w-40 flex-initial shrink-0 select-none "
				href="/"
			>
				<Logo />
			</a>
			<div class="flex-1" />
			<!-- Desktop menu -->
			<div class="z-10 hidden w-full flex-1 justify-end space-x-4 sm:flex lg:space-x-8">
				{#each menuItems as link}
					<a
						class="menu-link"
						onclick={() => (activeCategory = link.title)}
						class:active={activeCategory === link.title}
						href={link.path}
					>
						{link.displayTitle}
					</a>
				{/each}
			</div>

			<!-- Right side buttons -->
			<div class="sm:ml-14" />

			<div class="hidden sm:block" >
				<FeedbackButton/>
				<LanguageSwitcher />
				<ThemeChange class="z-50 ml-auto" />
			</div>


			<!-- Account / Login Button -->
			{#if $session.isPending}
				<div class="flex items-center gap-2 text-sm text-base-content/70">
					<span class="loading loading-spinner loading-sm"></span>
					<span class="hidden sm:inline">Loading...</span>
				</div>
			{:else if isAuthenticated && user}
				<!-- Authenticated User - Show Avatar -->
				<div class="dropdown dropdown-end">
					<button
						type="button"
						class="hover:bg-base-200 flex h-12 w-12 items-center justify-center rounded-full transition active:scale-95"
						aria-label="Account menu"
					>
						{#if user.image}
							<img
								src={user.image}
								alt={user.name || 'User'}
								class="size-8 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100"
							/>
						{:else}
							<div class="ring-primary ring-offset-base-100 flex size-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white ring-offset-2">
								{user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
							</div>
						{/if}
					</button>
					<ul class="menu dropdown-content rounded-box bg-base-100 z-10 w-52 p-2 shadow-lg">
						<li class="menu-title px-4 py-2">
							<span class="text-xs text-base-content/70">
								{user.name || user.email}
							</span>
						</li>
						<div class="divider my-0"></div>
						<li>
							<a href="/profile" class="flex items-center gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
								</svg>
								Profile
							</a>
						</li>
						<div class="divider my-0"></div>
						<li>
							<button onclick={handleLogout} class="flex items-center gap-2 text-error">
								<svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
								</svg>
								Logout
							</button>
						</li>
					</ul>
				</div>
			{:else}
				<!-- Not logged in - Show Login Button -->
				<button class="btn btn-primary btn-sm" onclick={() => (showLoginModal = true)}>
					<svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
					</svg>
					<span class="hidden sm:inline">Login</span>
				</button>
			{/if}
		</header>
	</div>
</nav>

<!-- Login Modal -->
<LoginModal
	appName="Top Svelte Todo"
	isOpen={showLoginModal}
	onClose={() => (showLoginModal = false)}
/>

<style>
	.menu-link {
		/* @apply hover:text-secondary font-medium transition; */
	}

	.menu-link.active {
		@apply text-[var(--color-primary)];
	}

	/* Frosted navigation header */
	nav {
		z-index: 10000;
		position: sticky;
		left: 0;
		right: 0;
		top: 0;
		/* height: 100px; */
	}

	/* Frosted Navigation bar */
	.bien-glass {
		position: absolute;
		inset: 0;
		/*   Extend the backdrop to the bottom for it to "collect the light" outside of the nav */
		--extended-by: 100px;
		bottom: calc(-1 * var(--extended-by));

		--filter: blur(30px);
		-webkit-backdrop-filter: var(--filter);
		backdrop-filter: var(--filter);
		pointer-events: none;

		/*   Cut the part of the backdrop that falls outside of <nav /> */
		--cutoff: calc(100% - var(--extended-by));
		-webkit-mask-image: linear-gradient(
			to bottom,
			black 0,
			black var(--cutoff),
			transparent var(--cutoff)
		);
	}

	.bien-glass-edge {
		position: absolute;
		z-index: -1;
		left: 0;
		right: 0;

		--extended-by: 80px;
		--offset: 20px;
		--thickness: 2px;
		height: calc(var(--extended-by) + var(--offset));
		/*   Offset is used to snuck the border backdrop slightly under the main backdrop for  smoother effect */
		top: calc(100% - var(--offset) + var(--thickness));

		/*   Make the blur bigger so that the light bleed effect spreads wider than blur on the first backdrop */
		/*   Increase saturation and brightness to fake smooth chamfered edge reflections */
		--filter: blur(90px) saturate(160%) brightness(1.3);
		-webkit-backdrop-filter: var(--filter);
		backdrop-filter: var(--filter);
		pointer-events: none;

		-webkit-mask-image: linear-gradient(
			to bottom,
			black 0,
			black var(--offset),
			transparent var(--offset)
		);
	}
</style>
