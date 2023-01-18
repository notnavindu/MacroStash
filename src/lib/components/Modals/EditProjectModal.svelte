<script lang="ts">
	import { createProject, updateProject } from '$utils/api/project.util';
	import { createEventDispatcher } from 'svelte';
	import Button from '$lib/components/common/Button.svelte';
	import TextInput from '$lib/components/common/TextInput.svelte';
	import Modal from './index.svelte';

	import { toSvg } from 'jdenticon';
	import type { Project } from '$lib/schemas/project.schema';

	export let selected: Project;

	let loading = false;

	const dispatch = createEventDispatcher();

	const handleSaveProject = async () => {
		if (selected.name.length == 0) return;

		loading = true;

		await updateProject({ ...selected });

		dispatch('ProjectEdit');
	};
</script>

<Modal on:ModalClose>
	<div class="text-xl mb-5">Edit project</div>

	<div class="w-full flex items-center justify-center my-3">
		{@html toSvg(selected.name, 140)}
	</div>

	<TextInput bind:value={selected.name} label="Project Name" required />

	<div class="mt-6">
		<Button on:click={handleSaveProject} bind:loading>Save</Button>
	</div>
</Modal>
