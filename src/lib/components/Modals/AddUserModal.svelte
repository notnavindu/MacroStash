<script>
	import { createEventDispatcher } from 'svelte';
	import Button from '$lib/components/common/Button.svelte';
	import TextInput from '$lib/components/common/TextInput.svelte';
	import Modal from './index.svelte';
	import { toSvg } from 'jdenticon';

	let loading = false;

	let name = '';
	let email = '';

	const dispatch = createEventDispatcher();

	const handleCreateUser = async () => {
		if (name.length == 0 || email.length == 0) return;

		loading = true;

		// await createProject({ name, allowedDomains: ['*'] });

		dispatch('ProjectCreate');
	};
</script>

<Modal on:ModalClose>
	<div class="text-xl mb-5">Add a user</div>

	<div class="w-full flex items-center justify-center my-3">
		{@html toSvg(name, 140)}
	</div>

	<TextInput bind:value={name} label="Name" required />

	<div class="mt-3">
		<TextInput bind:value={email} label="Email" required />
	</div>

	<div class="mt-8">
		<Button primary on:click={handleCreateUser} bind:loading>Save</Button>
	</div>
</Modal>
