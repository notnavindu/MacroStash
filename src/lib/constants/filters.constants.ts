import type { FilterList } from 'src/app';

export const filtersList: FilterList[] = [
	{
		title: 'Debug',
		value: 'debug',
		icon: 'material-symbols:bug-report',
		color: '#a12ff7'
	},
	{
		title: 'Info',
		value: 'info',
		icon: 'material-symbols:info',
		color: '#19b6ff'
	},
	{
		title: 'Warning',
		value: 'warn',
		icon: 'material-symbols:warning-rounded',
		color: '#ffa600'
	},
	{
		title: 'Error',
		value: 'error',
		icon: 'mdi:close-circle',
		color: '#ff362b'
	}
];

export const filterIcons = {
	debug: 'material-symbols:bug-report',
	info: 'material-symbols:info',
	warn: 'material-symbols:warning-rounded',
	error: 'mdi:close-circle'
};

export const filterColors = {
	debug: '#a12ff7',
	info: '#19b6ff',
	warn: '#ffa600',
	error: '#ff362b'
};
