<script lang="ts">
	import Button from '$lib/components/common/Button.svelte';
	import { firebaseAuthStore } from '$stores/auth.store';
	import { requestAccess } from '$utils/api/user.util';
	import Icon from '@iconify/svelte';
	import toast from 'svelte-french-toast';

	let requested = false;

	const handleRequestClick = async () => {
		try {
			await requestAccess(await $firebaseAuthStore.user!.getIdToken()!);
		} catch (error: unknown) {
			toast.error(error as string);
		}

		requested = true;
	};
</script>

<main class="w-full h-screen text-white bg-color-black-blueish flex items-center justify-center">
	<div class="flex flex-col items-center justify-center gap-8">
		<div class="h-fit relative icon-glow ">
			<Icon class="text-8xl text-orange-400 " icon="mdi:shield-alert-outline" />
		</div>
		<div class="text-2xl text-center">You don't have access to <br />log in to the dashboard</div>

		{#if requested}
			<Button disabled>Requested</Button>
		{:else}
			<Button primary on:click={handleRequestClick}>Request access</Button>
		{/if}
	</div>
</main>

<style lang="postcss">
	.icon-glow {
		filter: drop-shadow(0px 0px 20px rgb(251 146 60));
	}
</style>
