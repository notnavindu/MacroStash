<script>
	import { createProject } from '$utils/api/project.util';
	import { createEventDispatcher } from 'svelte';
	import Button from '../common/Button.svelte';
	import TextInput from '../common/TextInput.svelte';
	import Modal from './index.svelte';

	let loading = false;

	let name = '';

	const dispatch = createEventDispatcher();

	const handleCreateProject = async () => {
		if (name.length == 0) return;

		loading = true;

		await createProject({ name, allowedDomains: ['*'] });

		dispatch('ProjectCreate');
	};
</script>

<Modal on:ModalClose>
	<div class="text-xl mb-5">Create a project</div>

	<TextInput bind:value={name} label="Project Name" required />

	<div class="mt-6">
		<Button on:click={handleCreateProject} bind:loading>Save</Button>
	</div>
</Modal>
