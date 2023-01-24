<script lang="ts">
	import CreateProjectModal from '$lib/components/Modals/CreateProjectModal.svelte';
	import type { Project } from '$lib/schemas/project.schema';
	import { getAllProjects } from '$utils/api/project.util';

	import { toSvg } from 'jdenticon';
	import { fly } from 'svelte/transition';
	import EditProjectModal from '$lib/components/Modals/EditProjectModal.svelte';
	import { projects } from '$stores/data.store';

	let selected: Project | null;
	let createModalOpen = false;

	const refresh = async () => {
		$projects = await getAllProjects();
		createModalOpen = false;
		selected = null;
	};
</script>

<svelte:head>
	<title>Projects | MacroStash</title>
</svelte:head>

<div class="w-full flex justify-between items-center">
	<div class="text-3xl">Projects</div>
	<button
		on:click={() => (createModalOpen = true)}
		class="bg-color-blue px-5 py-1 rounded-md btn-glow  transition-all duration-500"
	>
		New
	</button>
</div>

<div class="flex flex-wrap gap-4 mt-9 w-full justify-center lg:justify-start">
	{#each $projects as project, i (project.id)}
		<button
			on:click={() => (selected = project)}
			in:fly={{ y: 50, delay: i * 50 }}
			class="w-full aspect-square max-w-[250px] bg-color-gray-light bg-opacity-20 
					flex items-center justify-center flex-col gap-4 rounded-lg hover:bg-opacity-30"
		>
			<div>
				{@html toSvg(project.name, 140)}
			</div>

			<div class="text-xl">{project.name}</div>
		</button>
	{/each}
</div>

<!-- Notifications -->
<!-- <div class="w-full flex justify-between items-center mt-12">
	<div class="text-3xl">Notifications</div>
	<div>On/Off</div>
</div>

<div class="flex flex-col gap-4 mt-9 w-full ">
	{#each $projects as project, i (project.id)}
		<div class="h-96 border-b">
			<div class="text-xl">{project.name}</div>
		</div>
	{/each}
</div> -->

{#if createModalOpen}
	<CreateProjectModal on:ProjectCreate={refresh} on:ModalClose={() => (createModalOpen = false)} />
{/if}

{#if selected}
	<EditProjectModal
		bind:selected
		on:ProjectEdit={refresh}
		on:ModalClose={() => (selected = null)}
	/>
{/if}

<style lang="postcss">
	.btn-glow:hover {
		box-shadow: 0px 0px 50px 0px #2a70fc;
	}
</style>
