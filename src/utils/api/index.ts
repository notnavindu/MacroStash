import { browser } from '$app/environment';
import { firebaseAuthStore } from '$stores/auth.store';
import axios, { type AxiosRequestConfig } from 'axios';
import { get } from 'svelte/store';

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use(
	async (config: AxiosRequestConfig) => {
		if (browser) {
			const firebaseToken = await get(firebaseAuthStore)?.user?.getIdToken();

			// @ts-ignore
			config.headers['firebase-token'] = firebaseToken;
		}

		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);

export { api };
