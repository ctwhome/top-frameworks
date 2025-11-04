import type { Handle } from '@sveltejs/kit';

/**
 * Server hooks
 *
 * Add your server-side auth handling here when integrating a backend.
 * Examples:
 * - Verify session tokens
 * - Refresh access tokens
 * - Inject user data into event.locals
 */

export const handle: Handle = async ({ event, resolve }) => {
	// Add your auth middleware here
	// Example: event.locals.user = await getUserFromSession(event.cookies);

	const response = await resolve(event);
	return response;
};
