<script lang="ts">
	import Logo from '$lib/assets/icons/Logo.svelte';
	import FeedbackButton from '$lib/components/ui/feedback/FeedbackButton.svelte';
	import LanguageSwitcher from '$lib/components/ui/LanguageSwitcher.svelte';
	import { toggleMenu } from '$lib/stores/menu.store';
	import IconamoonMenuBurgerHorizontalBold from '~icons/iconamoon/menu-burger-horizontal-bold';
	import menuItems from '$lib/models/menu-itmes';
	import ThemeChange from '$lib/components/ui/ThemeChange/ThemeChange.svelte';
	import { AccountCoState } from 'jazz-tools/svelte';
	import { TodoAccount } from '$lib/jazz/schema';

	let activeCategory = $state('');

	// Jazz account state
	const me = new AccountCoState(TodoAccount);
</script>

<nav class="bien-nav mb-10">
	<div class="bien-glass"></div>
	<div class="bien-glass-edge"></div>
	<div class="relative container mx-auto py-2">
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
				class="no-drag mr-3 h-auto max-w-[140px] flex-initial shrink-0 select-none sm:max-w-[160px]"
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

			<FeedbackButton class="hidden sm:block" />
			<LanguageSwitcher />
			<ThemeChange class="z-50 ml-auto" />

			<!-- Jazz Account Indicator -->
			{#if me.current}
				<div class="dropdown dropdown-end">
					<button
						type="button"
						class="hover:bg-base-200 flex h-12 w-12 items-center justify-center rounded-full transition active:scale-95"
						aria-label="Account menu"
					>
						<div class="ring-primary ring-offset-base-100 flex size-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white ring-offset-2">
							{me.current.profile?.name?.charAt(0)?.toUpperCase() || 'J'}
						</div>
					</button>
					<ul class="menu dropdown-content rounded-box bg-base-100 z-10 w-52 p-2 shadow-lg">
						<li class="menu-title px-4 py-2">
							<span class="text-xs text-base-content/70">
								{me.current.profile?.name || 'Jazz User'}
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
					</ul>
				</div>
			{:else}
				<div class="flex items-center gap-2 text-sm text-base-content/70">
					<span class="loading loading-spinner loading-sm"></span>
					<span class="hidden sm:inline">Connecting...</span>
				</div>
			{/if}
		</header>
	</div>
</nav>

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
