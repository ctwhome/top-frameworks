<script lang="ts">
	/**
	 * Login Modal Component
	 *
	 * Simple login with Google OAuth via Better Auth
	 */
	import toast from 'svelte-french-toast';
	import { authClient } from '$lib/auth/auth-client';
	import BiGoogle from '~icons/bi/google';

	interface Props {
		appName: string;
		isOpen: boolean;
		onClose: () => void;
	}

	let { appName, isOpen, onClose }: Props = $props();

	let isLoading = $state(false);

	async function handleGoogleSignIn() {
		isLoading = true;
		try {
			onClose();
			await authClient.signIn.social({
				provider: 'google',
				callbackURL: '/'
			});
		} catch (e) {
			console.error('Google sign-in error:', e);
			toast.error('Sign in failed. Please try again.');
			isLoading = false;
		}
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			onClose();
		}
	}
</script>

{#if isOpen}
	<!-- Modal Backdrop -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
		onclick={handleBackdropClick}
		role="dialog"
		aria-modal="true"
	>
		<!-- Modal Content -->
		<div class="w-full max-w-sm rounded-lg border border-base-300 bg-base-100 p-8 shadow-xl">
			<div class="mb-6 flex items-center justify-between">
				<h2 class="text-2xl font-bold">Sign In</h2>
				<button
					type="button"
					class="btn btn-ghost btn-sm btn-circle"
					onclick={onClose}
					aria-label="Close"
				>
					✕
				</button>
			</div>

			<div class="space-y-4">
				<p class="text-center text-base-content/70">
					Sign in to sync your data across devices
				</p>

				<!-- Google Sign-in -->
				<button
					type="button"
					class="btn btn-primary w-full gap-2"
					onclick={handleGoogleSignIn}
					disabled={isLoading}
				>
					<BiGoogle class="size-5" />
					{isLoading ? 'Signing in...' : 'Continue with Google'}
				</button>
			</div>
		</div>
	</div>
{/if}
