<script lang="ts">
	import { Circle } from 'svelte-loading-spinners';
	import { fly } from 'svelte/transition';
	export let loading = false;
</script>

<button
	class="w-full bg-color-gray-light bg-opacity-30 text-white h-8 rounded-md flex items-center justify-center select-none overflow-hidden"
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
