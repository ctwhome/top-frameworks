/**
 * Jazz Authentication Provider - Simplified
 *
 * This is a compatibility layer that makes Jazz work with existing auth UI.
 * Jazz handles authentication automatically through the JazzProvider.
 *
 * Important: Actual Jazz account access happens in components using AccountCoState.
 * This store just tracks basic auth state for UI purposes.
 */

import { browser } from '$app/environment';
import type {
	User,
	LoginCredentials,
	RegisterCredentials,
	AuthResponse,
	AuthProvider
} from '../types';

const STORAGE_KEY = 'jazz_user';

/**
 * Simple Jazz Auth Adapter
 *
 * Jazz automatically creates accounts when users interact with the app.
 * This adapter provides a thin compatibility layer for existing auth UI.
 */
class JazzAuthProvider implements AuthProvider {
	user = $state<User | null>(null);
	isLoading = $state(false);

	constructor() {
		if (browser) {
			this.loadUserFromStorage();
		}
	}

	private loadUserFromStorage() {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				this.user = JSON.parse(stored);
			}
		} catch (error) {
			console.error('Failed to load user:', error);
		}
	}

	private saveUserToStorage(user: User) {
		if (browser) {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
			} catch (error) {
				console.error('Failed to save user:', error);
			}
		}
	}

	private clearUserFromStorage() {
		if (browser) {
			localStorage.removeItem(STORAGE_KEY);
		}
	}

	getCurrentUser(): User | null {
		return this.user;
	}

	// Getter for reactive access in components
	get isAuthenticated(): boolean {
		return !!this.user;
	}

	/**
	 * Login - Create a Jazz user account
	 *
	 * Jazz automatically handles account creation.
	 * This method creates a UI user for display purposes.
	 */
	async login(credentials: LoginCredentials): Promise<AuthResponse> {
		this.isLoading = true;

		try {
			// Validate credentials
			if (!credentials.email || !credentials.password) {
				return {
					success: false,
					error: 'Email and password are required'
				};
			}

			if (credentials.password.length < 8) {
				return {
					success: false,
					error: 'Password must be at least 8 characters'
				};
			}

			// Simulate Jazz account creation
			await new Promise((resolve) => setTimeout(resolve, 500));

			// Create user for UI
			const newUser: User = {
				id: crypto.randomUUID(),
				email: credentials.email,
				username: credentials.email.split('@')[0],
				verified: true,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				metadata: {
					loginMethod: 'jazz'
				}
			};

			this.user = newUser;
			this.saveUserToStorage(newUser);

			return {
				success: true,
				user: newUser,
				message: 'Logged in successfully! Jazz account is ready.'
			};
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Login failed'
			};
		} finally {
			this.isLoading = false;
		}
	}

	/**
	 * Register - Create a new Jazz account
	 */
	async register(credentials: RegisterCredentials): Promise<AuthResponse> {
		this.isLoading = true;

		try {
			// Validation
			if (!credentials.email || !credentials.password || !credentials.passwordConfirm) {
				return {
					success: false,
					error: 'All fields are required'
				};
			}

			if (credentials.password !== credentials.passwordConfirm) {
				return {
					success: false,
					error: 'Passwords do not match'
				};
			}

			if (credentials.password.length < 8) {
				return {
					success: false,
					error: 'Password must be at least 8 characters'
				};
			}

			// Simulate Jazz account creation
			await new Promise((resolve) => setTimeout(resolve, 500));

			// Create user for UI
			const newUser: User = {
				id: crypto.randomUUID(),
				email: credentials.email,
				username: credentials.username || credentials.email.split('@')[0],
				verified: true,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				metadata: {
					loginMethod: 'jazz'
				}
			};

			this.user = newUser;
			this.saveUserToStorage(newUser);

			return {
				success: true,
				user: newUser,
				message: 'Account created! Jazz is syncing your data.'
			};
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Registration failed'
			};
		} finally {
			this.isLoading = false;
		}
	}

	/**
	 * Logout - Clear user session
	 */
	async logout(): Promise<void> {
		if (!browser) return;

		try {
			// Clear state first
			this.user = null;

			// Clear localStorage immediately
			localStorage.removeItem(STORAGE_KEY);

			// Clear all localStorage items related to Jazz
			const keysToRemove: string[] = [];
			for (let i = 0; i < localStorage.length; i++) {
				const key = localStorage.key(i);
				if (key && (key.includes('jazz') || key.includes('Jazz'))) {
					keysToRemove.push(key);
				}
			}
			keysToRemove.forEach(key => localStorage.removeItem(key));

			// Clear Jazz data from IndexedDB
			try {
				const databases = await indexedDB.databases();
				for (const db of databases) {
					if (db.name && (db.name.includes('jazz') || db.name.includes('Jazz'))) {
						indexedDB.deleteDatabase(db.name);
					}
				}
			} catch (e) {
				console.warn('Could not clear IndexedDB:', e);
			}

			// Small delay to ensure storage is cleared
			await new Promise(resolve => setTimeout(resolve, 100));

			// Force reload to reset Jazz state
			window.location.href = '/';
		} catch (error) {
			console.error('Logout error:', error);
			// Force reload anyway
			window.location.href = '/';
		}
	}

	/**
	 * Auth state change subscription
	 */
	onAuthStateChange(callback: (user: User | null) => void): () => void {
		let lastUser = this.user;

		const interval = setInterval(() => {
			if (lastUser !== this.user) {
				lastUser = this.user;
				callback(this.user);
			}
		}, 100);

		return () => clearInterval(interval);
	}

	/**
	 * Password reset (not applicable for Jazz)
	 */
	async resetPassword(_email: string): Promise<AuthResponse> {
		return {
			success: false,
			error: 'Password reset is not available. Jazz uses device-based authentication.'
		};
	}

	/**
	 * Update user profile
	 */
	async updateProfile(updates: Partial<User>): Promise<AuthResponse> {
		if (!this.user) {
			return {
				success: false,
				error: 'Not authenticated'
			};
		}

		try {
			// Update local user
			this.user = {
				...this.user,
				...updates,
				updatedAt: new Date().toISOString()
			};

			this.saveUserToStorage(this.user);

			return {
				success: true,
				user: this.user,
				message: 'Profile updated'
			};
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Update failed'
			};
		}
	}
}

/**
 * Global auth store instance
 * Import this in components: `import { authStore } from '$lib/auth'`
 */
export const authStore = new JazzAuthProvider();
