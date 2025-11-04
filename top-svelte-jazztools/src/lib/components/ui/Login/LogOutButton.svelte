<script lang="ts">
	import { authStore } from '$lib/auth';
	import { goto } from '$app/navigation';

	async function handleLogout() {
		await authStore.logout();
		goto('/');
	}
</script>

<button
	onclick={handleLogout}
	class="border-content text-content hover:bg-base-300 mt-5 mr-6 cursor-pointer rounded-lg border-2 px-2 py-2 font-bold transition duration-200 ease-in-out hover:text-white"
>
	LOG OUT
</button>
