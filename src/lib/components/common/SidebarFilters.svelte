<script lang="ts">
	import { filtersList } from '$lib/constants/filters.constants';
	import type { Event } from '$lib/schemas/event.schema';
	import { filters } from '$stores/filters.store';
	import Icon from '@iconify/svelte';
	import type { FilterList } from 'src/app';
	import { fly } from 'svelte/transition';

	const setAll = () => {
		if ($filters.length == 4) return ($filters = []);

		return ($filters = ['debug', 'info', 'warn', 'error']);
	};

	const selectFilter = (val: any) => {
		if ($filters.includes(val)) $filters = $filters.filter((i) => i !== val);
		else $filters = [...$filters, val];
	};
</script>

<!-- <button
	on:click={setAll}
	class="px-3 py-1 border-2 border-white rounded-md flex items-center justify-center gap-2"
	class:glow={$filters.length == 4}
	style="--color: #ffffff"
>
	<Icon icon="bx:loader" class="text-xl" /> All
</button> -->

<button
	class="w-full h-full rounded-md px-6 py-2 flex items-center relative gap-3"
	class:selected={$filters.length == 4}
	style="--color: #ffffff1a"
	on:click={setAll}
>
	{#if $filters.length == 4}
		<div
			class="w-2 h-full rounded-l-md absolute left-0 top-0 glow selected"
			style="--color: #ffffff"
			transition:fly={{ x: -10 }}
		/>
	{/if}

	<Icon icon="bx:loader" class="text-xl" />
	<div>All</div>
</button>

{#each filtersList as filter, i}
	<button
		class="w-full h-full rounded-md px-6 py-2 flex items-center relative gap-3 transition-colors duration-200"
		class:selected={$filters.includes(filter.value)}
		style="--color: {filter.color + '1a'}"
		on:click={() => selectFilter(filter.value)}
	>
		{#if $filters.includes(filter.value)}
			<div
				class="w-2 h-full rounded-l-md absolute left-0 top-0 glow selected"
				style="--color: {filter.color}"
				transition:fly={{ x: -10, delay: i * 60 }}
			/>
		{/if}

		<Icon icon={filter.icon} class="text-xl" />
		<div>{filter.title}</div>
	</button>
{/each}

<style lang="postcss">
	.btn {
		border-color: var(--color);
		background-color: var(--color);
	}

	.glow {
		box-shadow: 0px 0px 20px 2px var(--color);
	}

	.selected {
		background-color: var(--color);
	}
</style>
