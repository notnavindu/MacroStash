<script lang="ts">
	import { filterConfig } from '$lib/constants/filters.constants';
	import type { Event } from '$lib/schemas/event.schema';
	import Icon from '@iconify/svelte';
	import { onDestroy } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';

	import { onMount } from 'svelte';

	const colors: string[] = Object.keys(filterConfig).map(
		(val) => filterConfig[val as Event['level']].color
	);

	let mounted = false;

	let rows: { id: number; color: string; len: number }[] = [];
	let rowIdx = 0;

	const updateRows = () => {
		let newElm = colors[Math.floor(Math.random() * colors.length)];
		rows = rows = [
			{
				id: rowIdx++,
				color: newElm,
				len: Math.random() * 70
			},
			...rows.slice(0, 10)
		];
	};

	for (let i = 0; i <= 10; i++) {
		updateRows();
	}

	let loopId = setInterval(updateRows, 1500);

	onMount(() => {
		mounted = true;
	});

	onDestroy(() => {
		clearInterval(loopId);
	});
</script>

<svelte:head>
	<title>MacroStash</title>
</svelte:head>

<main class="w-full min-h-screen bg-color-black-blueish flex items-center justify-center  p-4">
	<div class="w-full max-w-3xl flex flex-col gap-1 overflow-x-hidden text-white">
		<div class="text-4xl ">MacroStash</div>
		<div class="mb-5 opacity-75">A tiny, self-hostable log stash</div>

		{#if mounted}
			{#each rows as row, i (row.id)}
				<div
					in:fly={{ y: -60, duration: 1000, delay: i * 50 }}
					animate:flip
					class="w-full pl-5 pr-2 py-4  relative  bg-white bg-opacity-5 flex justify-between"
					style="color: {row.color};"
				>
					<div
						class="w-1 h-full absolute left-0 top-0"
						style="background: {row.color}; 
						box-shadow: 0px 0px 60px 4px {row.color}"
					/>

					<div
						in:fly={{ x: -60, duration: 1000 }}
						style="width: {row.len}%; 
								background: {row.color}; 
								box-shadow: 0px 0px 60px 1px {row.color}"
						class="h-2 ml-2"
					/>

					<div class="bg-white w-8 h-1 opacity-50" />
				</div>
			{/each}
		{/if}

		<div class="text-center text-lg mt-12">
			🚧 This project is still under development.<br /> You can star and watch it on
			<a class="text-color-blue underline" href="https://github.com/notnavindu/macro-stash"
				>GitHub</a
			>
			to stay updated
		</div>

		<div class="flex flex-col items-center justify-center mt-12 gap-3">
			<!-- {#if mounted}
				<div>Get Started</div>
				<div
					class="flex items-center justify-center gap-4 text-xl"
					in:fly={{ y: 40, duration: 600, delay: 100 }}
				>
					<a href="/events">
						<button
							class="w-fit px-4 py-2 bg-color-blue rounded-md flex items-center justify-center gap-2"
						>
							<Icon icon="material-symbols:play-arrow" />

							{#if PUBLIC_DEMO}
								Demo
							{/if}

							Dashboard
						</button>
					</a>

					<a href="https://github.com/notnavindu/macro-stash" target="_blank" rel="noreferrer">
						<button
							class="w-fit px-4 py-2 bg-color-gray-light rounded-md flex items-center justify-center gap-2"
						>
							<Icon icon="material-symbols:book" />
							Docs
						</button>
					</a>
				</div>
			{/if} -->
		</div>
	</div>
</main>
