// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { User } from 'firebase/auth';

// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
}

interface FirebaseAuthStore {
	isLoggedIn: boolean;
	user: User | null;
	loading: boolean;
}
