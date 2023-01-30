<script lang="ts">
	import Icon from '@iconify/svelte';
	import { nanoid } from 'nanoid';

	export let hostnames: any[] = [];

	const addEntry = () => {
		hostnames = [...hostnames, { id: nanoid(), value: '' }];
	};

	const removeEntry = (i: number) => {
		hostnames = hostnames.filter((item) => item.id !== i);
	};
</script>

<div class="flex flex-col gap-2">
	{#each hostnames as _, i (_.id)}
		<div class="flex gap-4">
			<input
				bind:value={hostnames[i].value}
				class="w-full py-2 px-3 bg-color-gray-light bg-opacity-30 rounded-md focus:outline-0"
			/>

			<button
				on:click={() => removeEntry(i)}
				class="flex-shrink flex items-center justify-center opacity-50"
			>
				<Icon icon="fluent-mdl2:blocked-12" />
			</button>
		</div>
	{/each}

	<button
		class="w-full py-1 bg-white bg-opacity-10 rounded-md flex items-center justify-center"
		on:click={addEntry}
	>
		+
	</button>
</div>
