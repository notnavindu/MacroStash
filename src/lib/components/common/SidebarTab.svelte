<script>
	import { fly } from 'svelte/transition';

	export let name = '';
	export let href = '';
	export let selected = false;
</script>

<a
	{href}
	class="h-full rounded-md px-6 py-2 bg-opacity-10 relative border-color-blue"
	class:bg-color-blue={selected}
>
	{#if selected}
		<div
			class="w-2 h-full bg-color-blue rounded-l-md absolute left-0 top-0 generic-glow"
			in:fly={{ x: -10 }}
		/>
	{/if}

	<div>{name}</div>
</a>
