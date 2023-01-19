<script>
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import SidebarTab from './SidebarTab.svelte';
	import Icon from '@iconify/svelte';
	import SidebarFilters from './SidebarFilters.svelte';

	export let collapsable = false;
	export let show = false;
</script>

{#if !collapsable || (collapsable && show)}
	<div
		class="w-72 bg-color-black fixed left-0 top-0 h-screen overflow-hidden z-50"
		transition:fly={{ x: -300 }}
	>
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
				name="Analytics"
				href="/analytics"
				selected={$page.url.pathname.startsWith('/analytics')}
			/>

			<SidebarTab
				name="Projects"
				href="/projects"
				selected={$page.url.pathname.startsWith('/projects')}
			/>

			<SidebarTab name="Users" href="/users" selected={$page.url.pathname.startsWith('/users')} />
		</div>

		<div class="px-4">
			<div class="h-px w-full bg-color-gray-light opacity-50 my-5" />
		</div>

		<div class="px-4">
			<div class="opacity-50">Filter by status</div>

			<div
				class="flex flex-wrap  gap-3 mt-2 transition-all duration-1000"
				class:disabled={!$page.url.pathname.startsWith('/events')}
			>
				<SidebarFilters />
			</div>
		</div>
	</div>
{/if}

<style>
	.disabled {
		@apply grayscale pointer-events-none opacity-75;
	}
</style>
