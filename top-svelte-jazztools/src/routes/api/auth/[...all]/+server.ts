/**
 * Better Auth API Route Handler
 *
 * This catch-all route handles all Better Auth API requests:
 * - /api/auth/signin - Sign in with credentials or OAuth
 * - /api/auth/signup - Create new account
 * - /api/auth/signout - Sign out
 * - /api/auth/session - Get current session
 * - /api/auth/callback/* - OAuth callbacks
 */

import { auth } from '$lib/server/auth';
import type { RequestHandler } from './$types';

// Use auth.handler directly for SvelteKit route handlers
export const GET: RequestHandler = async ({ request }) => {
	return auth.handler(request);
};

export const POST: RequestHandler = async ({ request }) => {
	return auth.handler(request);
};
