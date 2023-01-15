<script lang="ts">
	import { filterColors, filterIcons } from '$lib/constants/filters.constants';
	import type { Event } from '$lib/schemas/event.schema';
	import { filters } from '$stores/filters.store';
	import Icon from '@iconify/svelte';
	import { getFirestore } from 'firebase/firestore';
	import { collection, onSnapshot } from 'firebase/firestore';
	import { onDestroy } from 'svelte';
	import { flip } from 'svelte/animate';

	const db = getFirestore();
	let events: Event[] = [];

	const unsubscribe = onSnapshot(collection(db, 'events'), (snap) => {
		events = snap.docs.map((doc) => {
			return {
				id: doc.id,
				...doc.data()
			} as Event;
		});
	});

	onDestroy(unsubscribe);
</script>

<div class="text-3xl">Events</div>

<div class="h-full relative overflow-x-auto mt-6">
	<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
		<thead class="text-xs">
			<tr>
				<th scope="col" class="w-12 px-3 py-3"> Status </th>
				<th scope="col" class="px-6 py-3"> Message </th>
				<th scope="col" class="px-6 py-3"> Project </th>
				<th scope="col" class="px-6 py-3"> Timestamp </th>
			</tr>
		</thead>
		<tbody class="divide-y-[1px] divide-color-gray-light divide-opacity-40">
			{#each events.filter((elm) => $filters.includes(elm.level)) as event (event.id)}
				<tr animate:flip class="  ">
					<!-- TODO: Optimize constants -->
					<td
						class="pl-5 pr-2 py-4 text-center whitespace-nowrap text-xl relative"
						style="color: {filterColors[event.level]};"
					>
						<div
							class="w-1 h-full absolute left-0 top-0"
							style="background: {filterColors[event.level]}; 
									box-shadow: 0px 0px 50px 2px {filterColors[event.level]}"
						/>
						<Icon icon={filterIcons[event.level]} />
					</td>
					<td class="px-6 py-4 whitespace-nowrap"> {event.message} </td>
					<td class="px-6 py-4"> FIX ME </td>
					<td class="px-6 py-4"> 3 hours ago</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
