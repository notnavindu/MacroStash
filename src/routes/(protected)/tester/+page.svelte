<script lang="ts">
	import type { Project } from '$lib/schemas/project.schema';
	import { createProject, getAllProjects } from '$utils/api/project.util';

	const tempData: Project = {
		name: 'Rpi',
		allowedDomains: ['http://localhost:5173/']
	};

	const createProj = async () => {
		await createProject(tempData);
	};
	const getALl = async () => {
		const t = await getAllProjects();
		console.log(t);
	};
</script>

<div>
	<button on:click={createProj}>Create</button>
	<button on:click={getALl}>getAll</button>
</div>
