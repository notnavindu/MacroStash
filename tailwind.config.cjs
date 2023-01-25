/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'color-black': '#090B10',
				'color-black-blueish': '#0F111A',
				'color-gray': '#232227',
				'color-gray-light': '#66656D',
				'color-blue': '#2A71FC'
			}
		}
	},
	plugins: [require('tailwind-scrollbar-hide')]
};
