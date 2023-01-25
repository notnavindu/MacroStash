<script>
	import '../app.css';
	import '../satoshi.css';

	import { browser } from '$app/environment';
	import { firebaseAuthStore } from '$stores/auth.store';
	import { initilizeFirebase } from '$utils/firebase.util';
	import { page } from '$app/stores';

	if (browser) initilizeFirebase();
</script>

{#if $page.url.pathname === '/'}
	<slot />
{:else if $firebaseAuthStore.loading}
	<div>Loading</div>
{:else}
	<slot />
{/if}
