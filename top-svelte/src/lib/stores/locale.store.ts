import { writable } from 'svelte/store';
import { setLocale as paraglideSetLocale, getLocale } from '$lib/paraglide/runtime';
import type { Locale } from '$lib/paraglide/runtime';

function createLocaleStore() {
	const { subscribe, set } = writable<string>(getLocale());

	return {
		subscribe,
		setLocale: async (locale: string) => {
			await paraglideSetLocale(locale as Locale, { reload: false });
			set(locale);
		}
	};
}

export const locale = createLocaleStore();
