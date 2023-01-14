<script>
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import SidebarTab from './SidebarTab.svelte';
	import Icon from '@iconify/svelte';

	export let collapsable = false;
	export let show = false;
</script>

{#if !collapsable || (collapsable && show)}
	<div class="w-72 bg-color-black fixed left-0 top-0 h-screen" transition:fly={{ x: -300 }}>
		<div class="w-full text-2xl p-4 mt-4 flex justify-between">
			<span>MacroStash</span>

			{#if collapsable}
				<button on:click={() => (show = false)}>
					<Icon icon="carbon:close" />
				</button>
			{/if}
		</div>

		<div class="mt-2 flex flex-col p-4 gap-2">
			<SidebarTab
				name="Events"
				href="/events"
				selected={$page.url.pathname.startsWith('/events')}
			/>

			<SidebarTab
				name="Event Grid"
				href="/grid"
				selected={$page.url.pathname.startsWith('/grid')}
			/>

			<SidebarTab
				name="Projects"
				href="/projects"
				selected={$page.url.pathname.startsWith('/projects')}
			/>

			<SidebarTab
				name="Counters"
				href="/counter"
				selected={$page.url.pathname.startsWith('/counter')}
			/>
		</div>

		<div class="px-4">
			<div class="h-px w-full bg-color-gray-light opacity-50 my-5" />
		</div>

		<div class="px-4">
			<div class="opacity-50">Filter by status</div>

			<div class="flex flex-wrap  gap-2 mt-2">
				<div
					class="px-3 py-1 border-2 border-color-gray-light rounded-md flex items-center justify-center gap-2"
				>
					<Icon icon="bx:loader" class="text-xl" /> All
				</div>

				<div
					class="px-3 py-1 border-2 border-yellow-400 rounded-md flex items-center justify-center gap-2"
				>
					<Icon icon="material-symbols:warning" class="text-yellow-400 text-xl" /> Warning
				</div>

				<div
					class="px-3 py-1 border-2 border-color-blue rounded-md flex items-center justify-center gap-2 bg-color-blue generic-glow"
				>
					<Icon icon="material-symbols:info" class="text-color-black text-xl" />
					<span class="text-color-black font-bold"> Info </span>
				</div>
			</div>
		</div>
	</div>
{/if}
