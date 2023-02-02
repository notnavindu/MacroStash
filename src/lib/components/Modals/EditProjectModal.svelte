<script lang="ts">
	import Button from '$lib/components/common/Button.svelte';
	import TextInput from '$lib/components/common/TextInput.svelte';
	import { updateProject } from '$utils/api/project.util';
	import { createEventDispatcher } from 'svelte';
	import Modal from './index.svelte';
	import { filterConfig } from '$lib/constants/filters.constants';
	import { LOG_LEVELS, type Event } from '$lib/schemas/event.schema';
	import type { Project } from '$lib/schemas/project.schema';
	import Icon from '@iconify/svelte';
	import { toSvg } from 'jdenticon';
	import toast from 'svelte-french-toast';
	import HostnamesEditor from '../common/HostnamesEditor.svelte';
	import { nanoid } from 'nanoid';
	import { isDemo } from '$config/demo';

	export let selected: Project;

	let loading = false;
	let selectedLogLevel: Event['level'] = 'debug';

	let hostnames: any[] = selected.allowedDomains.map((ip) => {
		return {
			id: nanoid(),
			value: ip
		};
	});

	const dispatch = createEventDispatcher();

	const handleSaveProject = async () => {
		if (isDemo) {
			dispatch('ProjectEdit');
			return toast.error('Editing is disabled on demo mode');
		}

		if (selected.name.length == 0) return;

		loading = true;

		await updateProject({
			...selected,
			allowedDomains: hostnames.map((v) => v.value).filter((v) => v.length > 0)
		});

		dispatch('ProjectEdit');
	};

	const copyUrl = (id: string) => {
		const value = `https://${window.location.host}/api/events/${id}`;
		navigator.clipboard.writeText(value);
	};

	const copyConfig = (level: string) => {
		const value = `{
		"message": "Add message here",
		"level": "${level}"
		}
		`;
		navigator.clipboard.writeText(value);
	};

	console.log(hostnames);
</script>

<Modal on:ModalClose>
	<div class="text-xl mb-5">Edit project</div>

	<div class="w-full flex items-center justify-center my-3 flex-col gap3">
		{@html toSvg(selected.name, 140)}

		<div class="text-xs opacity-50">
			{selected.id}
		</div>
	</div>

	<TextInput bind:value={selected.name} label="Project Name" required />

	<div class="mt-8">
		<div class="text-sm mb-2 opacity-75">Whitelisted IPs</div>
		<HostnamesEditor bind:hostnames />
	</div>

	<div class="mt-8">
		<div class="text-sm mb-2 opacity-75">Logging URL</div>
		<div
			class="w-full py-2 px-3 bg-color-gray-light bg-opacity-30 rounded-md opacity-75 break-all text-xs md:text-sm flex items-center gap-3 justify-between"
		>
			<div>https://{window.location.host}/api/events/{selected.id}</div>
			<button class="text-lg" on:click={() => copyUrl(selected.id)}>
				<Icon icon={'material-symbols:content-copy-outline'} />
			</button>
		</div>
	</div>

	<div class="mt-8">
		<div class="text-sm mb-2 opacity-75">Request body</div>

		<div class="flex gap-2 mb-2 text-xl">
			{#each LOG_LEVELS as level}
				<button
					class:grayscale={selectedLogLevel !== level}
					on:click={() => (selectedLogLevel = level)}
					style="color: {filterConfig[level].color}"
				>
					<Icon icon={filterConfig[level].icon} />
				</button>
			{/each}
		</div>

		<div
			class="w-full py-2 px-3 bg-color-gray-light bg-opacity-30 rounded-md opacity-75 flex gap-3 justify-between items-center"
		>
			<div class="flex flex-col text-xs md:text-sm">
				<div>&#123;</div>
				<div class="ml-5">"message": "Add message here",</div>
				<div class="ml-5">
					"level":
					<span class="font-bold" style="color: {filterConfig[selectedLogLevel].color}">
						"{selectedLogLevel}"
					</span>
				</div>
				<div>&#125;</div>
			</div>

			<button on:click={() => copyConfig(selectedLogLevel)} class="text-lg">
				<Icon icon={'material-symbols:content-copy-outline'} />
			</button>
		</div>
	</div>

	<div class="mt-8">
		<Button on:click={handleSaveProject} bind:loading>Save</Button>
	</div>
</Modal>
