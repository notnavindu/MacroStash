<script>
	import Button from '$lib/components/common/Button.svelte';
</script>

<div class="text-2xl font-bold font-monts">Sveltekit + firebase auth Starter</div>

<div class="w-full max-w-md flex flex-col gap-3">
	<a href="/dogs">
		<Button>Dogs (public)</Button>
	</a>

	<a href="/cats">
		<Button>Cats (private)</Button>
	</a>

	<a href="/profile">
		<Button>Profile</Button>
	</a>

	<a href="/home">
		<Button>Home</Button>
	</a>
</div>
