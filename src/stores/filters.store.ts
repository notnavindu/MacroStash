import type { Event } from '$lib/schemas/event.schema';
import { writable } from 'svelte/store';

export const filters = writable<Event['level'][]>(['debug', 'info', 'warn', 'error']);
export const projectFilters = writable<string[]>([]);
