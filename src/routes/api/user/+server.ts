import { initializeApp, getApps, type ServiceAccount, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

import type { RequestHandler } from './$types';
import { z } from 'zod';

import { error, json } from '@sveltejs/kit';
import { projectSchema, type Project } from '$lib/schemas/project.schema';
import { config } from '$config/firebaseConfig';

if (getApps().length === 0) {
	initializeApp({
		credential: cert(config as ServiceAccount)
	});
}

export const GET = (async ({ request }) => {
	const token = request.headers.get('firebase-token');

	if (!token) throw error(403, { message: 'No token' });

	const auth = getAuth();
	const db = getFirestore();

	return auth.verifyIdToken(token).then(async (decoded) => {
		let user = (await db.collection('users').doc(decoded.uid).get()).data();

		if (!user) {
			user = { email: decoded.email };

			await db.collection('users').doc(decoded.uid).set(user);
		}

		return json({ user: user });
	});
}) satisfies RequestHandler;
