<script>
	import '../app.css';
	import '../satoshi.css';

	import { browser } from '$app/environment';
	import { firebaseAuthStore } from '$stores/auth.store';
	import { initilizeFirebase } from '$utils/firebase.util';
	import { Toaster } from 'svelte-french-toast';
	import { page } from '$app/stores';

	if (browser) initilizeFirebase();
</script>

<Toaster
	toastOptions={{ style: 'background: #333; color: #fff;', duration: 2500 }}
	position="top-right"
/>

{#if $page.url.pathname === '/'}
	<slot />
{:else if $firebaseAuthStore.loading}
	<div>Loading</div>
{:else}
	<slot />
{/if}
