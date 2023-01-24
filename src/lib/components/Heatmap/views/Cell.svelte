<script>
	// @ts-nocheck
	import { stringifyDate } from '../utils/date';

	export let color;
	export let date;
	export let radius;
	export let size;
	export let value;
	export let x = 0;
	export let y;
</script>

<g>
	<title>{stringifyDate(date)} - {value} events</title>
	<rect
		data-date={stringifyDate(date)}
		data-value={value}
		fill={color}
		height={size}
		rx={radius}
		width={size}
		{x}
		{y}
	/>
</g>
