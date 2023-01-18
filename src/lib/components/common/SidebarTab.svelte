<script>
	import { fly } from 'svelte/transition';

	export let name = '';
	export let href = '';
	export let selected = false;
	export let color = '#2A71FC';
</script>

<a
	{href}
	class="h-full rounded-md px-6 py-2 !bg-opacity-10 relative"
	class:selected
	style="--color: {color + '1a'}"
>
	{#if selected}
		<div
			class="w-2 h-full rounded-l-md absolute left-0 top-0 glow selected"
			style="--color: {color}"
			in:fly={{ x: -10 }}
		/>
	{/if}

	<div>{name}</div>
</a>

<style lang="postcss">
	.selected {
		background-color: var(--color);
	}

	.glow {
		box-shadow: 0px 0px 20px 2px var(--color);
	}
</style>
