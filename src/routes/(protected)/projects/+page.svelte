<script lang="ts">
	import type { Project } from '$lib/schemas/project.schema';
	import { getAllProjects } from '$utils/api/project.util';
	import { onMount } from 'svelte';

	let projects: Project[] = [];

	onMount(async () => {
		projects = await getAllProjects();
	});
</script>

<div class="text-3xl">Projects</div>

<div>{JSON.stringify(projects)}</div>
