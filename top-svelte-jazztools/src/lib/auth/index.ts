/**
 * Auth Module - Backend Agnostic Authentication
 *
 * This module provides a clean interface for authentication that can work with any backend.
 * The current implementation is a mock/in-memory version for development.
 *
 * To integrate a real backend:
 * 1. Implement the AuthProvider interface from types.ts
 * 2. Replace MockAuthProvider in store.svelte.ts with your implementation
 * 3. All UI components will continue to work without changes
 *
 * Supported Backends (examples):
 * - Supabase: Use @supabase/supabase-js
 * - Firebase: Use firebase/auth
 * - PocketBase: Use pocketbase SDK
 * - Custom API: Implement with fetch/axios
 */

export * from './types';
export { authStore } from './store.svelte';
