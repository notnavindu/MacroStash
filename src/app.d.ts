// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { User } from 'firebase/auth';
import type { ZodFormattedError } from 'zod';

// and what to do when importing types

declare global {
	declare namespace App {
		interface Error {
			errors?: ZodFormattedError;
		}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

interface FirebaseAuthStore {
	isLoggedIn: boolean;
	user: User | null;
	loading: boolean;
}
