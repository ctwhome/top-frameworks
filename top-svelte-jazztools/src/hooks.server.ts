/**
 * SvelteKit Server Hooks
 *
 * Integrates Better Auth middleware for handling authentication requests.
 * Better Auth intercepts auth-related requests and handles them automatically.
 */

import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Better Auth handler processes authentication requests
	return svelteKitHandler({ event, resolve, auth, building });
};
