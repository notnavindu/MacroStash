<script lang="ts">
	import AddUserModal from '$lib/components/Modals/AddUserModal.svelte';
	import type { User } from '$lib/schemas/user.schema';
	import { getDocs, getFirestore } from 'firebase/firestore';
	import { collection } from 'firebase/firestore';
	import { toSvg } from 'jdenticon';
	import { onMount } from 'svelte';

	let users: User[] = [];
	const db = getFirestore();

	let addUserOpen = false;

	onMount(async () => {
		users = await getDocs(collection(db, 'users')).then((snap) => {
			return snap.docs.map((user) => {
				return {
					id: user.id,
					...user.data()
				} as User;
			});
		});
	});
</script>

{#if addUserOpen}
	<AddUserModal />
{/if}

<div class="w-full flex justify-between items-center">
	<div class="text-3xl">Users</div>
	<button
		on:click={() => (addUserOpen = true)}
		class="bg-color-blue px-5 py-1 rounded-md btn-glow  transition-all duration-500"
	>
		Add
	</button>
</div>

<div class="flex flex-wrap gap-4 mt-9 w-full justify-star">
	{#each users as user (user.id)}
		<div
			class="w-fit bg-color-gray-light bg-opacity-20 
					flex  items-center justify-center gap-4 rounded-lg p-5"
		>
			<div class="flex-shrink-0">
				{@html toSvg(user.name, 70)}
			</div>

			<div class="flex flex-col items-start pr-3">
				<div class="text-xl">{user.name}</div>
				<div class="opacity-50">{user.email}</div>
			</div>
		</div>
	{/each}
</div>
