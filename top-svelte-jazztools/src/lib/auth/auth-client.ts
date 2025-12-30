/**
 * Better Auth Client Configuration
 *
 * Client-side auth with Jazz plugin for account linking.
 * Jazz plugin syncs Better Auth users with Jazz accounts.
 */

import { createAuthClient } from 'better-auth/svelte';
import { jazzPluginClient } from 'jazz-tools/better-auth/auth/client';

export const authClient = createAuthClient({
	baseURL: typeof window !== 'undefined' ? window.location.origin : '',
	plugins: [jazzPluginClient()]
});

// Export typed session helpers
export const {
	signIn,
	signUp,
	signOut,
	getSession,
	useSession
} = authClient;
