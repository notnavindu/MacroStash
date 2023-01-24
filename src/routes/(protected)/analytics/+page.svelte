<script lang="ts">
	import SvelteHeatmap from '$lib/components/Heatmap';
	import { events } from '$stores/data.store';
	import { onMount } from 'svelte';
	// import SvelteHeatmap from 'svelte-heatmap';

	const allColors = ['#999999', '#B3B3B3', '#CCCCCC', '#E6E6E6', '#FFFFFF'];
	const debugColors = ['#6D07BB', '#8A09EC', '#A12FF7', '#B862F9', '#CE93FB'];
	const infoColors = ['#007AB2', '#009DE5', '#19B6FF', '#4CC6FF', '#80D7FF'];
	const warningColors = ['#996400', '#CC8500', '#FFA600', '#FFB833', '#FFCA66'];
	const errorColors = ['#C20A00', '#F50D00', '#FF362B', '#FF645C', '#FF958F'];

	let allEvents: object[] = [];
	let debugEvents: object[] = [];
	let infoEvents: object[] = [];
	let warningEvents: object[] = [];
	let errorEvents: object[] = [];

	const startDate = new Date('January 01, 2023');
	const endDate = new Date('December 31, 2023');

	const processData = () => {
		$events.forEach((ev) => {
			allEvents = [...allEvents, { date: ev.timestamp.toDate(), value: 1 }];

			switch (ev.level) {
				case 'debug':
					debugEvents = [...debugEvents, { date: ev.timestamp.toDate(), value: 1 }];
					break;
				case 'info':
					infoEvents = [...infoEvents, { date: ev.timestamp.toDate(), value: 1 }];
					break;
				case 'warn':
					warningEvents = [...warningEvents, { date: ev.timestamp.toDate(), value: 1 }];
					break;
				case 'error':
					errorEvents = [...errorEvents, { date: ev.timestamp.toDate(), value: 1 }];
					break;
				default:
					break;
			}
		});
	};

	$: $events.length > 0 && processData();
</script>

<svelte:head>
	<title>Analytics | MacroStash</title>
</svelte:head>

<main class="w-full">
	<div class="w-full flex justify-between items-center mb-12">
		<div class="text-3xl">Heatmap</div>
		<!-- FIXME: before 2024 -->
		<div>2023</div>
	</div>

	<div class="mt-16 mb-2 text-2xl flex justify-between items-center ">
		<span>All</span>
		<div class="flex gap-1 text-xs">
			Less
			{#each allColors as color}
				<div class="w-4 h-4" style="background: {color};" />
			{/each}
			More
		</div>
	</div>
	<div class="w-full overflow-x-auto pt-3 scrollbar-default pb-4">
		<div class="min-w-[800px] w-full">
			<SvelteHeatmap
				cellRadius="100%"
				fontColor="#ffffff"
				emptyColor="#303030"
				dayLabelWidth={0}
				view="yearly"
				colors={allColors}
				data={allEvents}
				{startDate}
				{endDate}
			/>
		</div>
	</div>

	<!--  ---------------------------------------------------------------------- -->
	<!-- Debug -->

	<div class="mt-16 mb-2 text-2xl flex justify-between items-center">
		<span style="color: {debugColors[2]}">Debug</span>
		<div class="flex gap-1 text-xs">
			Less
			{#each debugColors as color}
				<div class="w-4 h-4" style="background: {color};" />
			{/each}
			More
		</div>
	</div>
	<div class="w-full overflow-x-auto pt-3 scrollbar-default pb-4">
		<div class="min-w-[800px] w-full">
			<SvelteHeatmap
				cellRadius="100%"
				fontColor="#ffffff"
				emptyColor="#303030"
				dayLabelWidth={0}
				view="yearly"
				data={debugEvents}
				colors={debugColors}
				{startDate}
				{endDate}
			/>
		</div>
	</div>

	<!--  ---------------------------------------------------------------------- -->
	<!-- Info -->

	<div class="mt-16 mb-2 text-2xl flex justify-between items-center ">
		<span style="color: {infoColors[2]}">info</span>
		<div class="flex gap-1 text-xs">
			Less
			{#each infoColors as color}
				<div class="w-4 h-4" style="background: {color};" />
			{/each}
			More
		</div>
	</div>
	<div class="w-full overflow-x-auto pt-3 scrollbar-default pb-4">
		<div class="min-w-[800px] w-full">
			<SvelteHeatmap
				cellRadius="100%"
				fontColor="#ffffff"
				emptyColor="#303030"
				dayLabelWidth={0}
				view="yearly"
				data={infoEvents}
				colors={infoColors}
				{startDate}
				{endDate}
			/>
		</div>
	</div>

	<!--  ---------------------------------------------------------------------- -->
	<!-- Warning -->

	<div class="mt-16 mb-2 text-2xl flex justify-between items-center ">
		<span style="color: {warningColors[2]}">Warnings</span>

		<div class="flex gap-1 text-xs">
			Less
			{#each warningColors as color}
				<div class="w-4 h-4" style="background: {color};" />
			{/each}
			More
		</div>
	</div>
	<div class="w-full overflow-x-auto pt-3 scrollbar-default pb-4">
		<div class="min-w-[800px] w-full">
			<SvelteHeatmap
				cellRadius="100%"
				fontColor="#ffffff"
				emptyColor="#303030"
				dayLabelWidth={0}
				view="yearly"
				data={warningEvents}
				colors={warningColors}
				{startDate}
				{endDate}
			/>
		</div>
	</div>

	<!--  ---------------------------------------------------------------------- -->
	<!-- Errors -->

	<div class="mt-16 mb-2 text-2xl flex justify-between items-center ">
		<span style="color: {errorColors[2]}">Errors</span>

		<div class="flex gap-1 text-xs">
			Less
			{#each errorColors as color}
				<div class="w-4 h-4" style="background: {color};" />
			{/each}
			More
		</div>
	</div>
	<div class="w-full overflow-x-auto pt-3 scrollbar-default pb-4">
		<div class="min-w-[800px] w-full">
			<SvelteHeatmap
				cellRadius="100%"
				fontColor="#ffffff"
				emptyColor="#303030"
				dayLabelWidth={0}
				view="yearly"
				data={errorEvents}
				colors={errorColors}
				{startDate}
				{endDate}
			/>
		</div>
	</div>
</main>

<style>
	/* width */
	::-webkit-scrollbar {
		width: 5px;
		height: 3px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: #f1f1f1;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #888;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
</style>
