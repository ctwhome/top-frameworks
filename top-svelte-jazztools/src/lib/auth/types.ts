/**
 * Abstract authentication types and interfaces
 * These types are backend-agnostic and can be implemented by any auth provider
 * (Supabase, Firebase, PocketBase, custom backend, etc.)
 */

export interface User {
	id: string;
	email: string;
	username?: string;
	verified?: boolean;
	avatarUrl?: string;
	createdAt?: string;
	updatedAt?: string;
	metadata?: Record<string, any>;
}

export interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterCredentials {
	email: string;
	password: string;
	passwordConfirm: string;
	username?: string;
}

export interface AuthResponse {
	success: boolean;
	user?: User;
	error?: string;
	message?: string;
}

/**
 * Abstract Auth Provider Interface
 * Any backend implementation should implement these methods
 */
export interface AuthProvider {
	/**
	 * Get current authenticated user
	 */
	getCurrentUser(): User | null;

	/**
	 * Check if user is authenticated
	 */
	isAuthenticated(): boolean;

	/**
	 * Login with email and password
	 */
	login(credentials: LoginCredentials): Promise<AuthResponse>;

	/**
	 * Register new user
	 */
	register(credentials: RegisterCredentials): Promise<AuthResponse>;

	/**
	 * Logout current user
	 */
	logout(): Promise<void>;

	/**
	 * Subscribe to auth state changes
	 */
	onAuthStateChange(callback: (user: User | null) => void): () => void;

	/**
	 * Send password reset email
	 */
	resetPassword?(email: string): Promise<AuthResponse>;

	/**
	 * Update user profile
	 */
	updateProfile?(updates: Partial<User>): Promise<AuthResponse>;
}

export interface AuthError {
	message: string;
	code?: string;
	status?: number;
}

export type AuthResult = AuthResponse;

export interface RegisterResponse extends AuthResponse {}

export type AuthProviderType = 'credentials' | 'google' | 'magic-link' | 'mock';
