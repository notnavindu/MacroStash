<script>
	import '../app.css';
	import '../satoshi.css';

	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { firebaseAuthStore } from '$stores/auth.store';
	import { initilizeFirebase } from '$utils/firebase.util';
	import toast, { Toaster } from 'svelte-french-toast';
	import { Jumper } from 'svelte-loading-spinners';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { localVersion } from '$config/version';

	if (browser) initilizeFirebase();

	onMount(async () => {
		let remoteConfig = (await axios.get('https://config-mgr.vercel.app/api/macrostash')).data;

		if (remoteConfig.version > localVersion) {
			toast('Newer Version Available!', { icon: '⬆️' });
		}
	});
</script>

<Toaster
	toastOptions={{ style: 'background: #333; color: #fff;', duration: 2500 }}
	position="top-right"
/>

{#if $page.url.pathname === '/'}
	<slot />
{:else if $firebaseAuthStore.loading}
	<div class="w-full h-screen fixed inset-0 flex items-center justify-center bg-black">
		<Jumper size="60" color="#FF3E00" unit="px" duration="1s" />
	</div>
{:else}
	<slot />
{/if}
