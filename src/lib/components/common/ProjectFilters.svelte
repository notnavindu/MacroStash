<script lang="ts">
	import { projects } from '$stores/data.store';
	import { projectFilters } from '$stores/filters.store';
	import Icon from '@iconify/svelte';

	import { fly } from 'svelte/transition';

	const setAll = () => {
		if ($projectFilters.length == $projects.length) return ($projectFilters = []);

		return ($projectFilters = $projects.map((p) => p.id));
	};

	const selectFilter = (val: string) => {
		if ($projectFilters.includes(val)) $projectFilters = $projectFilters.filter((i) => i !== val);
		else $projectFilters = [...$projectFilters, val];
	};
</script>

<button
	class="w-full h-full rounded-md px-6 py-2 flex items-center relative gap-3"
	class:selected={$projectFilters.length == $projects.length}
	style="--color: #2A71FC1a"
	on:click={setAll}
>
	{#if $projectFilters.length == $projects.length}
		<div
			class="w-2 h-full rounded-l-md absolute left-0 top-0 glow selected"
			style="--color: #2A71FC"
			transition:fly={{ x: -10 }}
		/>
	{/if}

	<Icon icon="bx:loader" class="text-xl" />
	<div>All</div>
</button>

{#each $projects as project, i (project.id)}
	<button
		class:selected={$projectFilters.includes(project.id)}
		class="w-full h-full rounded-md px-6 py-2 flex items-center relative gap-3 transition-colors duration-200"
		style="--color: #2A71FC1a"
		on:click={() => selectFilter(project.id)}
	>
		{#if $projectFilters.includes(project.id)}
			<div
				class="w-2 h-full rounded-l-md absolute left-0 top-0 glow selected opacity-50"
				style="--color: #2A71FC"
				transition:fly={{ x: -10, delay: i * 60 }}
			/>
		{/if}

		<Icon icon="material-symbols:folder-open-rounded" class="text-xl" />
		<div>{project.name}</div>
	</button>
{:else}
	<div
		class="w-full h-full rounded-md px-6 py-2 flex items-center relative gap-3 transition-colors duration-200"
		style="--color: #2A71FC1a"
	>
		<div>Loading</div>
	</div>
{/each}

<style lang="postcss">
	.selected {
		background-color: var(--color);
	}
</style>
