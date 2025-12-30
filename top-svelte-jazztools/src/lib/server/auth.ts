/**
 * Better Auth Server Configuration
 *
 * Database setup:
 * - Local: SQLite file (better-auth.db)
 * - Production: Turso (set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN)
 *
 * Jazz plugin links Google accounts to Jazz accounts for cross-device sync.
 */

import { betterAuth } from 'better-auth';
import { jazzPlugin } from 'jazz-tools/better-auth/auth/server';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BETTER_AUTH_SECRET } from '$env/static/private';
import { PUBLIC_BETTER_AUTH_URL } from '$env/static/public';

// Database configuration
// - Development: SQLite file (better-sqlite3)
// - Production: Turso (set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN)
import Database from 'better-sqlite3';

export const auth = betterAuth({
	baseURL: PUBLIC_BETTER_AUTH_URL,
	secret: BETTER_AUTH_SECRET,

	// SQLite database for storing users and sessions
	database: new Database('db/better-auth.db'),

	// Jazz plugin - links Better Auth users to Jazz accounts
	plugins: [jazzPlugin()],

	// OAuth Social Providers
	socialProviders: {
		google: {
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET
		}
		// Add more providers:
		// github: { clientId: '...', clientSecret: '...' },
	},

	// Session configuration
	session: {
		expiresIn: 60 * 60 * 24 * 7, // 7 days
		updateAge: 60 * 60 * 24 // Update session every 24 hours
	},

	// Advanced options
	advanced: {
		cookiePrefix: 'jazz-auth'
	}
});

export type Session = typeof auth.$Infer.Session;
