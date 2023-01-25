import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess({
		postcss: true
	}),

	kit: {
		adapter: adapter(),
		alias: {
			$stores: 'src/stores',
			'$stores/*': 'src/stores/*',
			$utils: 'src/utils',
			'$utils/*': 'src/utils/*',
			$config: 'src/config',
			'$config/*': 'src/config/*'
		}
	}
};

export default config;
