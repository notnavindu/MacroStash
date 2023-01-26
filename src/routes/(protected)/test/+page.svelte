<script>
	import axios from 'axios';

	// let values = [
	// 	{
	// 		level: 'info',
	// 		text: 'Plant watering sequence successfully completed'
	// 	},
	// 	{
	// 		level: 'warn',
	// 		text: 'Rainfall too high. Skipping watering'
	// 	},
	// 	{
	// 		level: 'error',
	// 		text: 'Loss of power'
	// 	},
	// 	{
	// 		level: 'info',
	// 		text: 'Watering sequence successfully completed'
	// 	},
	// 	{
	// 		level: 'warn',
	// 		text: 'Dog possibly sitting on watering device'
	// 	},
	// 	{
	// 		level: 'error',
	// 		text: 'Loss of power'
	// 	},
	// 	{
	// 		level: 'debug',
	// 		text: 'Input voltage: 12v'
	// 	}
	// ];

	// this file is used only to add dummy data to the demo

	let values = [
		{
			level: 'warn',
			text: 'Yes I know this makes no sense cus its not in order.'
		}
	];

	const sendEvent = async () => {
		const val = values[(Math.random() * values.length) | 0];

		await axios.post('/api/events/3P2DJGXElZZu36UPu60F', {
			message: val.text,
			level: val.level
		});
	};
</script>

<button on:click={sendEvent}> Fuck it </button>
