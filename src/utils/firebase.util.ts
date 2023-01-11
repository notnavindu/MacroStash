import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { firebaseAuthStore, firebaseStore } from '$stores/auth.store';
import { get } from 'svelte/store';
import {
	PUBLIC_FIREBASE_APIKEY,
	PUBLIC_FIREBASE_AUTHDOMAIN,
	PUBLIC_FIREBASE_PROJECT_ID,
	PUBLIC_FIREBASE_STORAGE_BUCKET,
	PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
	PUBLIC_FIREBASE_APP_ID
} from '$env/static/public';
import { goto } from '$app/navigation';

export const initilizeFirebase = async () => {
	console.log('init');

	if ((await get(firebaseStore)) !== null) return;

	let firebaseConfig = {
		apiKey: PUBLIC_FIREBASE_APIKEY,
		authDomain: PUBLIC_FIREBASE_AUTHDOMAIN,
		projectId: PUBLIC_FIREBASE_PROJECT_ID,
		storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
		appId: PUBLIC_FIREBASE_APP_ID
	};

	console.log(firebaseConfig);

	const app = initializeApp(firebaseConfig);
	const auth = getAuth();

	firebaseStore.set(app);

	auth.onAuthStateChanged(async (user) => {
		console.log('state changed', user);

		firebaseAuthStore.set({
			isLoggedIn: user !== null,
			user: user,
			loading: false
		});

		if (!user) {
			goto('/');
		}

		console.log(await get(firebaseAuthStore));
	});
};
