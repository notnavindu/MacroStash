<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Sidebar from '$lib/components/common/Sidebar.svelte';
	import { firebaseAuthStore } from '$stores/auth.store';
	import { fly } from 'svelte/transition';
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
	import DataListeners from '$lib/components/DataListeners.svelte';
	import DeployModal from '$lib/components/Modals/DeployModal.svelte';

	let loggedIn = false;
	let innerWidth = 0;
	let show = false;
	let setupModalOpen = false;

	if (browser) {
		if ($firebaseAuthStore.user !== null) loggedIn = true;
		else goto(`/login`);
	}

	$: collapsable = innerWidth <= 768;
	$: $page.url.pathname && (show = false);
</script>

<svelte:window bind:innerWidth />

{#if setupModalOpen}
	<DeployModal on:ModalClose={() => (setupModalOpen = true)} />
{/if}

{#if loggedIn}
	<DataListeners />

	<main class="w-full min-h-screen bg-color-black-blueish text-white">
		<Sidebar {collapsable} bind:show />

		{#if collapsable}
			<div
				class="bg-color-black flex items-center py-3 px-3 gap-4 text-xl"
				transition:fly={{ y: -30 }}
			>
				<button on:click={() => (show = true)}>
					<Icon icon="cil:hamburger-menu" />
				</button>

				<div class="flex items-center">MacroStash</div>
			</div>
		{/if}

		<div class="h-full p-4 md:p-6" class:ml-72={!collapsable}>
			<slot />
		</div>

		<button
			class="px-3 py-2 rounded-l-lg fixed right-0 bottom-4 z-40 bg-blue-600 text-xs"
			on:click={() => (setupModalOpen = true)}
		>
			Deploy for free
		</button>
	</main>
{/if}
