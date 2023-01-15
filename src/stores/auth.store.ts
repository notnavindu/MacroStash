import type { FirebaseApp } from 'firebase/app';
import type { User } from 'firebase/auth';
import type { FirebaseAuthStore } from 'src/app';
import { writable } from 'svelte/store';

export const firebaseStore = writable<FirebaseApp | null>(null);

export const firebaseAuthStore = writable<FirebaseAuthStore>({
	isLoggedIn: false,
	user: null,
	loading: true
});

export const user = writable<User | null>(null);
