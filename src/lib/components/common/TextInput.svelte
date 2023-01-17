<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let label: string;
	export let readOnly = false;
	export let required = false;
	export let value = '';
	export let placeholder = '';

	export const focus = () => {
		inputBox.focus();
	};

	let inputBox: HTMLInputElement;

	const dispatch = createEventDispatcher();

	const handleKeypress = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === 'NumpadEnter') {
			event.preventDefault();
			dispatch('enterPressed');
		}
	};
</script>

<label class="w-full" class:opacity-60={readOnly}>
	<div class="text-sm mb-2">
		<span class="opacity-75">
			{label}
		</span>
		{#if required} <span class="text-red-500 align-top">*</span>{/if}
	</div>

	<input
		bind:this={inputBox}
		bind:value
		disabled={readOnly}
		{required}
		{placeholder}
		class="w-full py-2 px-3 bg-color-gray-light bg-opacity-30 rounded-md focus:outline-0"
		on:keypress={handleKeypress}
	/>
</label>
