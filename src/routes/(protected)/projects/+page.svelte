<script lang="ts">
	import CreateProjectModal from '$lib/components/Modals/CreateProjectModal.svelte';
	import type { Project } from '$lib/schemas/project.schema';
	import { getAllProjects } from '$utils/api/project.util';
	import { onMount } from 'svelte';

	let projects: Project[] = [];
	let createModalOpen = false;

	onMount(async () => {
		projects = await getAllProjects();
	});

	const handleProjectCreate = async () => {
		projects = await getAllProjects();
		createModalOpen = false;
	};
</script>

<div class="w-full flex justify-between items-center">
	<div class="text-3xl">Projects</div>
	<button
		on:click={() => (createModalOpen = true)}
		class="bg-color-blue px-5 py-1 rounded-md btn-glow  transition-all duration-500"
	>
		New
	</button>
</div>

{#each projects as project}
	{project.name} <br />
{/each}

{#if createModalOpen}
	<CreateProjectModal
		on:ProjectCreate={handleProjectCreate}
		on:ModalClose={() => (createModalOpen = false)}
	/>
{/if}

<style lang="postcss">
	.btn-glow:hover {
		box-shadow: 0px 0px 50px 0px #2a70fc;
	}
</style>
