<script lang="ts">
	import { filterConfig } from '$lib/constants/filters.constants';
	import type { Event } from '$lib/schemas/event.schema';
	import { onDestroy, onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { blur, fade, fly } from 'svelte/transition';

	const colors: string[] = Object.keys(filterConfig).map(
		(val) => filterConfig[val as Event['level']].color
	);

	let rows: { id: number; color: string; len: number }[] = [];
	let rowIdx = 0;

	const updateRows = () => {
		let newElm = colors[Math.floor(Math.random() * colors.length)];
		rows = rows = [
			{
				id: rowIdx++,
				color: newElm,
				len: Math.random() * 50
			},
			...rows.slice(0, 10)
		];
	};

	for (let i = 0; i <= 10; i++) {
		updateRows();
	}

	let loopId = setInterval(updateRows, 2000);

	onDestroy(() => {
		console.log('destroyed');
		clearInterval(loopId);
	});
</script>

<main class="w-full h-screen bg-color-black-blueish flex items-center justify-center  p-4">
	<div class="w-full max-w-3xl flex flex-col gap-1 overflow-x-hidden text-white">
		<div class="text-4xl mb-5">MacroStash</div>
		{#each rows as row, i (row.id)}
			<div
				animate:flip
				class="w-full pl-5 pr-2 py-4 text-center relative  bg-white bg-opacity-5"
				style="color: {row.color};"
			>
				<div
					class="w-1 h-full absolute left-0 top-0"
					style="background: {row.color}; 
					box-shadow: 0px 0px 60px 4px {row.color}"
				/>

				<div
					in:fly={{ x: -60 }}
					style="width: {row.len}%; 
							background: {row.color}; 
							box-shadow: 0px 0px 60px 1px {row.color}"
					class="h-2 ml-2"
				/>
			</div>
		{/each}
	</div>
</main>
