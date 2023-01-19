import type { Event } from '$lib/schemas/event.schema';
import type { Project } from '$lib/schemas/project.schema';
import { writable } from 'svelte/store';

export const projects = writable<Project[]>([]);
export const events = writable<Event[]>([]);
