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
				name="Counters"
				href="/counter"
				selected={$page.url.pathname.startsWith('/counter')}
			/>
		</div>

		<div class="px-4">
			<div class="h-px w-full bg-color-gray-light opacity-50 my-5" />
		</div>
	</div>
{/if}
