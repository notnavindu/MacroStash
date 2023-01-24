<script lang="ts">
	import Button from '$lib/components/common/Button.svelte';
	import { firebaseAuthStore } from '$stores/auth.store';
	import Icon from '@iconify/svelte';

	import { goto } from '$app/navigation';
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
				goto('/events');
			})
			.catch((error) => {
				console.log(error.message);
				// ...
			});
	};
</script>

{#if !loading}
	<main class="w-full h-screen text-white bg-color-black-blueish flex items-center justify-center">
		<div class="flex flex-col items-center justify-center gap-8">
			<div class="h-fit relative icon-glow ">
				<Icon class="text-8xl text-teal-400 " icon="ri:login-box-line" />
			</div>
			<div class="text-2xl text-center">Log in to MacroStash</div>

			<Button primary on:click={signUp}>Sign in with Google</Button>
		</div>
	</main>
{/if}

<style lang="postcss">
	.icon-glow {
		filter: drop-shadow(0px 0px 20px rgb(60, 251, 140));
	}
</style>
