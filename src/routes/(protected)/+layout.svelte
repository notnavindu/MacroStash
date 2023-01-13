<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { firebaseAuthStore, user } from '$stores/auth.store';

	let loggedIn = false;

	if (browser) {
		if ($firebaseAuthStore.user !== null) loggedIn = true;
		else goto(`/login`);
	}
</script>

{#if loggedIn}
	<main class="w-full h-screen bg-color-black-blueish text-white">
		<div class="w-72 bg-color-black fixed left-0 top-0 h-screen">
			<div class="text-2xl  p-4">MacroStash</div>

			<div class="mt-12 flex flex-col p-4">
				<div
					class="h-full bg-color-blue rounded-md px-6 py-2
							 bg-opacity-20 relative "
				>
					<div class="w-2 h-full bg-color-blue rounded-l-md absolute left-0 top-0 generic-glow" />
					<div>Events</div>
				</div>

				<div
					class="h-full  rounded-md px-6 py-2
							 bg-opacity-20 relative "
				>
					<!-- <div class="w-2 h-full bg-color-blue rounded-l-md absolute left-0 top-0 generic-glow" /> -->
					<div>Coutner</div>
				</div>
			</div>
		</div>

		<div class="ml-72">
			<slot />
		</div>
	</main>
{/if}
