<script lang="ts">
	/**
	 * Login Modal Component
	 *
	 * Modal that shows passkey authentication with passphrase recovery
	 * Only shown when user clicks "Login" button
	 */
	import { usePasskeyAuth, usePassphraseAuth } from 'jazz-tools/svelte';
	import { wordlist } from '$lib/jazz/wordlist';
	import toast from 'svelte-french-toast';

	interface Props {
		appName: string;
		isOpen: boolean;
		onClose: () => void;
	}

	let { appName, isOpen, onClose }: Props = $props();

	const passphraseAuth = usePassphraseAuth({ wordlist });
	const auth = usePasskeyAuth({ appName });

	let name = $state('');
	let passphraseInput = $state('');
	let showPassphrase = $state(false);
	let showRecoveryLogin = $state(false);

	function handleSignUp() {
		if (!name.trim()) {
			toast.error('Please enter your name');
			return;
		}
		auth.current.signUp(name.trim());
		showPassphrase = true;
		toast.success('Account created! Save your recovery key below.');

		// Close modal after short delay
		setTimeout(() => {
			onClose();
			showPassphrase = false;
		}, 8000);
	}

	function handleLogin() {
		auth.current.logIn();
		// Close modal after auth completes
		setTimeout(() => onClose(), 1000);
	}

	function handlePassphraseLogin() {
		if (!passphraseInput.trim()) {
			toast.error('Please enter your recovery key');
			return;
		}
		passphraseAuth.logIn(passphraseInput.trim());
		// Close modal after auth completes
		setTimeout(() => onClose(), 1000);
	}

	function copyPassphrase() {
		navigator.clipboard.writeText(passphraseAuth.passphrase || '');
		toast.success('Recovery key copied to clipboard!');
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
		<div class="w-full max-w-md rounded-lg border border-base-300 bg-base-100 p-8 shadow-xl">
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

			{#if showRecoveryLogin}
				<!-- Recovery Key Login -->
				<div class="space-y-4">
					<div class="form-control">
						<label class="label" for="passphrase-input">
							<span class="label-text">Recovery Key</span>
						</label>
						<textarea
							id="passphrase-input"
							bind:value={passphraseInput}
							rows={3}
							class="textarea textarea-bordered font-mono text-xs"
							placeholder="Enter your recovery key..."
						></textarea>
					</div>

					<button class="btn btn-primary w-full" onclick={handlePassphraseLogin}>
						Sign In with Recovery Key
					</button>

					<button
						type="button"
						class="btn btn-ghost w-full"
						onclick={() => {
							showRecoveryLogin = false;
							passphraseInput = '';
						}}
					>
						← Back to Passkey Login
					</button>
				</div>
			{:else}
				<!-- Passkey Auth -->
				<div class="space-y-4">
					<!-- Create Account -->
					<div class="space-y-2">
						<div class="form-control">
							<label class="label" for="name-input">
								<span class="label-text">Your Name</span>
							</label>
							<input
								id="name-input"
								type="text"
								bind:value={name}
								class="input input-bordered w-full"
								placeholder="Enter your name"
								onkeydown={(e) => e.key === 'Enter' && handleSignUp()}
							/>
						</div>
						<button class="btn btn-primary w-full" onclick={handleSignUp}>
							Create Account
						</button>
					</div>

					<div class="divider">OR</div>

					<!-- Login with Passkey -->
					<button class="btn btn-secondary w-full" onclick={handleLogin}>
						Sign In with Passkey
					</button>

					<div class="divider">Need Help?</div>

					<!-- Recovery Login -->
					<button
						type="button"
						class="btn btn-ghost w-full"
						onclick={() => (showRecoveryLogin = true)}
					>
						Sign in with Recovery Key →
					</button>
				</div>
			{/if}

			<!-- Info -->
			<div class="alert alert-info mt-6">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="h-6 w-6 shrink-0 stroke-current"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					></path>
				</svg>
				<div class="text-xs">
					<strong>Secure Authentication:</strong> Uses passkeys (biometric/device security) with a recovery
					key for cross-device access.
				</div>
			</div>
		</div>
	</div>

	<!-- Show passphrase toast after signup -->
	{#if showPassphrase && passphraseAuth.passphrase}
		<div class="toast toast-top toast-center z-9999 max-w-2xl">
			<div class="alert alert-warning shadow-lg">
				<div class="w-full">
					<div class="mb-2 flex items-start justify-between">
						<h3 class="font-bold">🔑 Save Your Recovery Key</h3>
						<button
							type="button"
							class="btn btn-ghost btn-sm"
							onclick={() => (showPassphrase = false)}
							aria-label="Close"
						>
							✕
						</button>
					</div>
					<p class="mb-3 text-sm">
						This key allows you to access your account on other devices. Keep it safe!
					</p>
					<textarea
						readonly
						value={passphraseAuth.passphrase}
						rows={3}
						class="textarea textarea-bordered w-full font-mono text-xs"
					></textarea>
					<div class="mt-2 flex gap-2">
						<button class="btn btn-sm btn-primary" onclick={copyPassphrase}>
							Copy Key
						</button>
						<button class="btn btn-sm btn-ghost" onclick={() => (showPassphrase = false)}>
							I've Saved It
						</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
{/if}
