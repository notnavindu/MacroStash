<script lang="ts">
	import AddUserModal from '$lib/components/Modals/AddUserModal.svelte';
	import type { User } from '$lib/schemas/user.schema';
	import { approveUser, getAllUsers, getPendingUsers, rejectUser } from '$utils/api/user.util';
	import Icon from '@iconify/svelte';
	import { toSvg } from 'jdenticon';
	import { onMount } from 'svelte';

	let users: User[] = [];
	let pendingUsers: User[] = [];
	let loading = true;

	let addUserOpen = false;

	onMount(async () => {
		users = await getAllUsers();
		pendingUsers = await getPendingUsers();

		loading = false;
	});

	const handleAccept = async (uid: string) => {
		loading = true;

		await approveUser(uid);

		pendingUsers = await getPendingUsers();
		users = await getAllUsers();

		loading = false;
	};

	const handleReject = async (uid: string) => {
		loading = true;

		await rejectUser(uid);

		pendingUsers = await getPendingUsers();
		users = await getAllUsers();

		loading = false;
	};
</script>

{#if addUserOpen}
	<AddUserModal />
{/if}

<div class:disabled={loading}>
	<div class="text-3xl">Users</div>
	<div class="flex flex-wrap gap-4 mt-5 w-full justify-star">
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

	<div class="text-3xl mt-9">Pending Approval</div>
	<div class="flex flex-wrap gap-4 mt-5 w-full justify-star">
		{#each pendingUsers as user (user.id)}
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

				<div class="flex flex-col text-2xl gap-2">
					<button on:click={() => handleAccept(user.id)}>
						<Icon class="text-green-500" icon="mdi:tick-circle" />
					</button>

					<button on:click={() => handleReject(user.id)}>
						<Icon class="text-red-500" icon="mdi:close-circle" />
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.disabled {
		@apply opacity-50 pointer-events-none;
	}
</style>
