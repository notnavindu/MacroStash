<script lang="ts">
	import type { Event } from '$lib/schemas/event.schema';
	import { events, projects } from '$stores/data.store';
	import { projectFilters } from '$stores/filters.store';
	import { getAllProjects } from '$utils/api/project.util';
	import { getFirestore } from 'firebase/firestore';
	import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
	import { onDestroy } from 'svelte';

	getAllProjects().then((val) => {
		$projects = val;
		$projectFilters = val.map((proj) => proj.id);
	});

	const db = getFirestore();

	const unsubscribe = onSnapshot(
		query(collection(db, 'events'), orderBy('timestamp', 'desc')),
		(snap) => {
			$events = snap.docs.map((doc) => {
				return {
					id: doc.id,
					...doc.data()
				} as Event;
			});
		}
	);

	onDestroy(unsubscribe);
</script>
