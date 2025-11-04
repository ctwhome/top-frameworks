<script lang="ts">
	import { locales } from '$lib/paraglide/runtime';
	import { locale } from '$lib/stores/locale.store';
	import PhTranslate from '~icons/ph/translate';

	let isOpen = $state(false);

	const languageNames: Record<string, string> = {
		en: 'English',
		es: 'Español',
		nl: 'Nederlands',
		de: 'Deutsch',
		fr: 'Français'
	};

	const languageFlags: Record<string, string> = {
		en: '🇬🇧',
		es: '🇪🇸',
		nl: '🇳🇱',
		de: '🇩🇪',
		fr: '🇫🇷'
	};

	async function changeLanguage(newLocale: string) {
		await locale.setLocale(newLocale);
		isOpen = false;
	}

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function closeDropdown() {
		isOpen = false;
	}
</script>

<div class="dropdown dropdown-end">
	<button
		type="button"
		class="btn  btn-sm gap-2"
		onclick={toggleDropdown}
		aria-label="Change language"
		aria-haspopup="true"
		aria-expanded={isOpen}
	>
		<PhTranslate class="size-5" />
		<span class="hidden sm:inline">{languageFlags[$locale]}</span>
	</button>

	{#if isOpen}
		<ul
			class="menu dropdown-content rounded-box bg-base-100 z-[1] mt-3 w-52 p-2 shadow-lg"
			role="menu"
		>
			{#each locales as localeOption}
				<li>
					<button
						type="button"
						class="flex items-center gap-3"
						class:active={localeOption === $locale}
						onclick={() => changeLanguage(localeOption)}
						role="menuitem"
					>
						<span class="text-xl">{languageFlags[localeOption]}</span>
						<span>{languageNames[localeOption]}</span>
						{#if localeOption === $locale}
							<span class="ml-auto text-primary">✓</span>
						{/if}
					</button>
				</li>
			{/each}
		</ul>

		<!-- Invisible overlay to close dropdown when clicking outside -->
		<button
			type="button"
			class="fixed inset-0 z-0"
			onclick={closeDropdown}
			aria-label="Close language menu"
			tabindex="-1"
		></button>
	{/if}
</div>
