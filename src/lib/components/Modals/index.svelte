<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { scale } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import Icon from '@iconify/svelte';

	const dispatch = createEventDispatcher();

	export let rounded = 'rounded-[20px]';

	function close(event: Event) {
		if (event.target === overlay) {
			dispatch('ModalClose');
		}
	}

	let overlay: HTMLElement;
</script>

<!-- Desktop  -->
<div
	class="flex flex-col items-center justify-center flex-grow fixed top-0 left-0 w-full h-full p-2 md:p-5 backdrop-blur-lg bg-black bg-opacity-50 z-[10000] text-white"
	on:keydown
	on:click={close}
	bind:this={overlay}
>
	<div
		transition:scale={{ start: 0.95, duration: 200, easing: expoOut }}
		class="w-full max-w-xl  max-h-[600px] bg-zinc-900 border border-zinc-700 relative {rounded} {$$props.class}"
	>
		<button
			type="button"
			class="absolute top-4 right-4"
			on:keydown
			on:click={() => dispatch('ModalClose')}
		>
			<Icon icon="carbon:close" />
		</button>

		<div class="p-4 md:p-6 max-h-[600px] overflow-y-auto">
			<slot />
		</div>
	</div>
</div>

<style>
	.z-override {
		z-index: var(--z, 40);
	}
</style>
