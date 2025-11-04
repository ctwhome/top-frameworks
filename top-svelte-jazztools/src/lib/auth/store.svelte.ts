import { browser } from '$app/environment';
import type { User, LoginCredentials, RegisterCredentials, AuthResponse, AuthProvider } from './types';

/**
 * Mock Auth Store Implementation
 *
 * This is a backend-agnostic auth store that stores state in-memory and localStorage.
 * Replace this implementation with your preferred backend (Supabase, Firebase, PocketBase, etc.)
 *
 * Features:
 * - Client-side only (browser check)
 * - In-memory state with localStorage persistence
 * - Mock authentication (always succeeds for demo purposes)
 * - Reactive state using Svelte 5 runes
 */

const STORAGE_KEY = 'auth_user';

class MockAuthProvider implements AuthProvider {
	user = $state<User | null>(null);
	isLoading = $state(false);

	constructor() {
		if (browser) {
			this.initializeAuth();
		}
	}

	private initializeAuth() {
		// Load user from localStorage on init
		try {
			const storedUser = localStorage.getItem(STORAGE_KEY);
			if (storedUser) {
				this.user = JSON.parse(storedUser);
			}
		} catch (error) {
			console.error('Failed to load user from storage:', error);
		}
	}

	getCurrentUser(): User | null {
		return this.user;
	}

	isAuthenticated(): boolean {
		return !!this.user;
	}

	async login(credentials: LoginCredentials): Promise<AuthResponse> {
		this.isLoading = true;

		try {
			// Simulate network delay
			await new Promise((resolve) => setTimeout(resolve, 500));

			// Mock validation - accept any non-empty credentials
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

			// Create mock user
			const mockUser: User = {
				id: crypto.randomUUID(),
				email: credentials.email,
				username: credentials.email.split('@')[0],
				verified: true,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				metadata: {
					loginMethod: 'email'
				}
			};

			// Set user and persist to localStorage
			this.user = mockUser;
			this.persistUser(mockUser);

			return {
				success: true,
				user: mockUser,
				message: 'Login successful'
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

	async register(credentials: RegisterCredentials): Promise<AuthResponse> {
		this.isLoading = true;

		try {
			// Simulate network delay
			await new Promise((resolve) => setTimeout(resolve, 500));

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

			// Create mock user
			const mockUser: User = {
				id: crypto.randomUUID(),
				email: credentials.email,
				username: credentials.username || credentials.email.split('@')[0],
				verified: false,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				metadata: {
					signupMethod: 'email'
				}
			};

			// Auto-login after registration
			this.user = mockUser;
			this.persistUser(mockUser);

			return {
				success: true,
				user: mockUser,
				message: 'Registration successful'
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

	async logout(): Promise<void> {
		this.user = null;
		if (browser) {
			localStorage.removeItem(STORAGE_KEY);
		}
	}

	onAuthStateChange(callback: (user: User | null) => void): () => void {
		// Simple subscription mechanism
		// In a real implementation, this would listen to backend auth events
		let lastUser = this.user;

		const interval = setInterval(() => {
			if (lastUser !== this.user) {
				lastUser = this.user;
				callback(this.user);
			}
		}, 100);

		return () => clearInterval(interval);
	}

	async resetPassword(email: string): Promise<AuthResponse> {
		// Simulate network delay
		await new Promise((resolve) => setTimeout(resolve, 500));

		if (!email) {
			return {
				success: false,
				error: 'Email is required'
			};
		}

		// Mock success
		return {
			success: true,
			message: 'Password reset email sent (mock)'
		};
	}

	async updateProfile(updates: Partial<User>): Promise<AuthResponse> {
		if (!this.user) {
			return {
				success: false,
				error: 'Not authenticated'
			};
		}

		// Simulate network delay
		await new Promise((resolve) => setTimeout(resolve, 500));

		// Update user
		this.user = {
			...this.user,
			...updates,
			updatedAt: new Date().toISOString()
		};

		this.persistUser(this.user);

		return {
			success: true,
			user: this.user,
			message: 'Profile updated successfully'
		};
	}

	private persistUser(user: User) {
		if (browser) {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
			} catch (error) {
				console.error('Failed to persist user:', error);
			}
		}
	}
}

/**
 * Global auth store instance
 * Import this in your components: `import { authStore } from '$lib/auth'`
 */
export const authStore = new MockAuthProvider();
