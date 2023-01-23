import type { FilterList } from 'src/app';
import type { Event } from '$lib/schemas/event.schema';

export const filterConfig: { [ket in Event['level']]: FilterList } = {
	debug: {
		title: 'Debug',
		value: 'debug',
		icon: 'material-symbols:bug-report',
		color: '#a12ff7'
	},
	info: {
		title: 'Info',
		value: 'info',
		icon: 'material-symbols:info',
		color: '#19b6ff'
	},
	warn: {
		title: 'Warning',
		value: 'warn',
		icon: 'material-symbols:warning-rounded',
		color: '#ffa600'
	},
	error: {
		title: 'Error',
		value: 'error',
		icon: 'mdi:close-circle',
		color: '#ff362b'
	}
};
