<script>
	import { createProject } from '$utils/api/project.util';
	import { createEventDispatcher } from 'svelte';
	import Button from '$lib/components/common/Button.svelte';
	import TextInput from '$lib/components/common/TextInput.svelte';
	import Modal from './index.svelte';
	import { toSvg } from 'jdenticon';
	import toast from 'svelte-french-toast';
	import { isDemo } from '$config/demo';

	let loading = false;

	let name = '';

	const dispatch = createEventDispatcher();

	const handleCreateProject = async () => {
		if (isDemo) {
			dispatch('ProjectCreate');
			return toast.error('You are not allowed to create projects in demo mode');
		}

		if (name.length == 0) return;

		loading = true;

		await createProject({ id: '', name, allowedDomains: ['*'] });

		dispatch('ProjectCreate');
	};
</script>

<Modal on:ModalClose>
	<div class="text-xl mb-5">Create a project</div>

	<div class="w-full flex items-center justify-center my-3">
		{@html toSvg(name, 140)}
	</div>

	<TextInput bind:value={name} label="Project Name" required />

	<div class="mt-8">
		<Button primary on:click={handleCreateProject} bind:loading>Save</Button>
	</div>
</Modal>
