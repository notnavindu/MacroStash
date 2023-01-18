<script lang="ts">
	import { Circle } from 'svelte-loading-spinners';
	import { fly } from 'svelte/transition';

	export let loading = false;
	export let primary = false;
</script>

<button
	class="w-full bg-color-gray-light text-white h-8 rounded-md flex items-center justify-center select-none overflow-hidden"
	class:bg-color-blue={primary}
	on:click
>
	{#if loading}
		<div class="select-none" in:fly={{ y: 20, duration: 200 }}>
			<Circle size="14" color="#ffffff" />
		</div>
	{:else}
		<div in:fly={{ y: 20, duration: 200 }}>
			<slot />
		</div>
	{/if}
</button>
