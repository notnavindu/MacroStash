<script>
	import { goto } from '$app/navigation';
	import { firebaseAuthStore } from '$stores/auth.store';
	import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
	import { onMount } from 'svelte';

	let loading = true;

	onMount(() => {
		if ($firebaseAuthStore.user !== null) goto(`/`);
		else loading = false;
	});

	const signUp = () => {
		const provider = new GoogleAuthProvider();

		const auth = getAuth();
		signInWithRedirect(auth, provider)
			.then((result) => {
				console.log(result);
				goto('/');
			})
			.catch((error) => {
				console.log(error.message);
				// ...
			});
	};
</script>

{#if !loading}
	<div>Login</div>

	<button on:click={signUp}>Login with google</button>
{/if}
