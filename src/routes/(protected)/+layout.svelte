<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { firebaseAuthStore, user } from '$stores/auth.store';

	let loggedIn = false;

	if (browser) {
		console.log('FROM PROTECTED', $firebaseAuthStore);
		if ($firebaseAuthStore.user !== null) loggedIn = true;
		else goto(`/login`);
	}
</script>

{#if loggedIn}
	<slot />
{/if}
