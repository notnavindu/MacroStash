<script>
	import Button from '$lib/components/common/Button.svelte';
	import TextInput from '$lib/components/common/TextInput.svelte';
	import Icon from '@iconify/svelte';
	import Modal from './index.svelte';

	let url = '';
</script>

<Modal on:ModalClose>
	<div class="text-xl mb-5 text-white">Deploy your own MacroStash instance to Vercel</div>

	<div class="text-color-blue">Step one</div>
	<div class="w-40 mt-1">
		<a target="_blank" rel="noreferrer" href="https://github.com/notnavindu/MacroStash/fork">
			<Button primary>
				<div class="flex items-center justify-center gap-2">
					<Icon icon="carbon:direction-fork" />
					Fork this repo
				</div>
			</Button>
		</a>
	</div>

	<div class="text-color-blue mt-4">Step two</div>
	<div class="mt-1">
		<TextInput
			placeholder="https://github.com/yourusername/repo"
			bind:value={url}
			label="Paste the link to your fork"
		/>
	</div>

	<div class="text-color-blue mt-4">Step three</div>
	<div class="w-48 mt-1">
		<a
			class:pointer-events-none={url.length === 0}
			target="_blank"
			rel="noreferrer"
			href={`https://vercel.com/new/clone?repository-url=${encodeURIComponent(
				url
			)}&env=PUBLIC_FIREBASE_APIKEY,PUBLIC_FIREBASE_AUTHDOMAIN,PUBLIC_FIREBASE_PROJECT_ID,PUBLIC_FIREBASE_STORAGE_BUCKET,PUBLIC_FIREBASE_MESSAGE_SENDER_ID,PUBLIC_FIREBASE_APP_ID,FIREBASE_SERVICE_ACCOUNT&envDescription=Visit%20this%20link%20to%20find%20how%20to%20get%20these%20values&envLink=https%3A%2F%2Fgithub.com%2Fnotnavindu%2FMacroStash%23environment-variables&project-name=macro-stash&repository-name=macro-stash&demo-title=Macro%20Stash&demo-description=A%20tiny%20self-hostable%20event%20log&demo-url=http%3A%2F%2Fmacro-stash.vercel.app%2F`}
		>
			<Button disabled={url.length === 0} primary>
				<div class="flex items-center justify-center gap-2">
					<Icon icon="eos-icons:code-deploy" />
					Deploy with vercel
				</div>
			</Button>
		</a>
	</div>

	<div class="mt-2 text-sm">
		Guide on how to find Firebase environment variables can be found
		<a
			class="text-color-blue underline"
			href="https://github.com/notnavindu/MacroStash#environment-variables">here</a
		>
	</div>
</Modal>
