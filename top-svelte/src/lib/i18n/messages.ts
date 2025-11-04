import { getLocale, baseLocale } from '$lib/paraglide/runtime';

import en from '../../../locale/messages/en.json';
import es from '../../../locale/messages/es.json';
import nl from '../../../locale/messages/nl.json';
import de from '../../../locale/messages/de.json';
import fr from '../../../locale/messages/fr.json';

type Dictionary = Record<string, string>;

const dictionaries: Record<string, Dictionary> = {
	en: en as Dictionary,
	es: es as Dictionary,
	nl: nl as Dictionary,
	de: de as Dictionary,
	fr: fr as Dictionary
};

type SupportedLocale = keyof typeof dictionaries;

const fallbackLocale: SupportedLocale = (baseLocale in dictionaries
	? (baseLocale as SupportedLocale)
	: 'en') satisfies SupportedLocale;

const fallbackDictionary = dictionaries[fallbackLocale];

const PLACEHOLDER_PATTERN = /\{(\w+)\}/g;

type MessageParams = Record<string, unknown>;

type MessageFunction = ((params?: MessageParams) => string) & { id: string };

function resolveLocale(): SupportedLocale {
	try {
		const locale = getLocale();
		if (typeof locale === 'string' && locale in dictionaries) {
			return locale as SupportedLocale;
		}
	} catch (error) {
		// getLocale can throw if no locale is configured yet. Fallback below.
	}
	return fallbackLocale;
}

function format(template: string, params: MessageParams = {}): string {
	return template.replace(PLACEHOLDER_PATTERN, (_, key) => {
		if (key in params) {
			const value = params[key];
			return value === null || value === undefined ? '' : String(value);
		}
		return `{${key}}`;
	});
}

function getTemplate(id: string, locale: SupportedLocale): string {
	const dictionary = dictionaries[locale] ?? fallbackDictionary;
	const template = dictionary[id] ?? fallbackDictionary[id];
	return typeof template === 'string' ? template : id;
}

function createMessage(id: string): MessageFunction {
	const message = (params: MessageParams = {}) => {
		const locale = resolveLocale();
		const template = getTemplate(id, locale);
		return format(template, params);
	};
	message.id = id;
	return message;
}

const messageIds = Object.keys(fallbackDictionary);
const messageFunctions: Record<string, MessageFunction> = {};

for (const id of messageIds) {
	messageFunctions[id] = createMessage(id);
}

export const m = messageFunctions as Record<string, MessageFunction>;

export const hello_world = m.hello_world;
export const home_title = m.home_title;
export const home_subtitle = m.home_subtitle;
export const home_logged_in_title = m.home_logged_in_title;
export const home_logged_in_email = m.home_logged_in_email;
export const home_logged_in_subtitle = m.home_logged_in_subtitle;
export const home_get_started_title = m.home_get_started_title;
export const home_get_started_description = m.home_get_started_description;
export const home_get_started_note = m.home_get_started_note;
export const home_features_title = m.home_features_title;
export const home_features_sveltekit = m.home_features_sveltekit;
export const home_features_tailwind = m.home_features_tailwind;
export const home_features_auth = m.home_features_auth;
export const home_features_typescript = m.home_features_typescript;
export const home_features_docker = m.home_features_docker;
export const home_integration_title = m.home_integration_title;
export const home_integrations_supabase = m.home_integrations_supabase;
export const home_integrations_firebase = m.home_integrations_firebase;
export const home_integrations_pocketbase = m.home_integrations_pocketbase;
export const home_integrations_custom = m.home_integrations_custom;
export const home_integrations_any = m.home_integrations_any;
