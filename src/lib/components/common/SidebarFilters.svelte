<script lang="ts">
	import { filtersList } from '$lib/constants/filters.constants';
	import type { Event } from '$lib/schemas/event.schema';
	import { filters } from '$stores/filters.store';
	import Icon from '@iconify/svelte';
	import type { FilterList } from 'src/app';

	const setAll = () => {
		if ($filters.length == 4) return ($filters = []);

		return ($filters = ['debug', 'info', 'warn', 'error']);
	};

	const selectFilter = (val: any) => {
		if ($filters.includes(val)) $filters = $filters.filter((i) => i !== val);
		else $filters = [...$filters, val];
	};
</script>

<button
	on:click={setAll}
	class="px-3 py-1 border-2 border-white rounded-md flex items-center justify-center gap-2"
	class:glow={$filters.length == 4}
	style="--color: #ffffff"
>
	<Icon icon="bx:loader" class="text-xl" /> All
</button>

{#each filtersList as filter}
	<button
		on:click={() => selectFilter(filter.value)}
		class="px-3 py-1 border-2 rounded-md flex items-center justify-center gap-2 btn text-black transition-all duration-1000"
		class:grayscale={!$filters.includes(filter.value)}
		class:glow={$filters.includes(filter.value)}
		style="--color: {filter.color}"
	>
		<Icon icon={filter.icon} class="text-xl" />
		<span class="font-bold"> {filter.title} </span>
	</button>
{/each}

<style lang="postcss">
	.btn {
		border-color: var(--color);
		background-color: var(--color);
	}

	.glow {
		box-shadow: 0px 0px 120px 2px var(--color);
	}
</style>
