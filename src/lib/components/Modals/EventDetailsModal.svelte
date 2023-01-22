<script lang="ts">
	import Modal from './index.svelte';
	import type { Event } from '$lib/schemas/event.schema';
	import { filterConfig } from '$lib/constants/filters.constants';
	import Icon from '@iconify/svelte';
	import { projects } from '$stores/data.store';

	export let event: Event;
</script>

<Modal on:ModalClose>
	<div class="text-3xl flex items-center gap-3" style="color: {filterConfig[event.level].color};">
		<Icon icon={filterConfig[event.level].icon} />
		<div>{filterConfig[event.level].title}</div>
	</div>

	<div class="flex flex-col mt-6">
		<div class="text-xs" style="color: {filterConfig[event.level].color};">Project</div>
		<div class="mt-1 bg-white bg-opacity-5 p-2 rounded-md">
			{$projects.find((p) => p.id == event.projectId)?.name || 'Invalid Project ID'}
		</div>
	</div>

	<div class="flex flex-col mt-4">
		<div class="text-xs" style="color: {filterConfig[event.level].color};">Message</div>
		<div class="mt-1 bg-white bg-opacity-5 p-2 rounded-md">{event.message}</div>
	</div>
</Modal>
