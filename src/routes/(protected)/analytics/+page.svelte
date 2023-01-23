<script lang="ts">
	import { events } from '$stores/data.store';
	import { onMount } from 'svelte';
	import SvelteHeatmap from 'svelte-heatmap';

	const allEvents = [];

	let data = [{ date: new Date('December 1, 2023'), value: 44 }];
	const startDate = new Date('January 01, 2023');
	const endDate = new Date('December 31, 2023');

	const processData = () => {
		$events.forEach((ev) => {
			allEvents.push({ date: ev.timestamp.toDate(), value: 1 });
		});

		data = [...allEvents];
	};

	$: $events.length > 0 && processData();
</script>

<svelte:head>
	<title>Analytics | MacroStash</title>
</svelte:head>

Anakytics
<div class="w-full overflow-hidden">
	<div class="">
		<SvelteHeatmap
			cellRadius="100%"
			fontColor="#ffffff"
			emptyColor="#303030"
			dayLabelWidth={0}
			view="yearly"
			{data}
			{startDate}
			{endDate}
		/>
	</div>
</div>
