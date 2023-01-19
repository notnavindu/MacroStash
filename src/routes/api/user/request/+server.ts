import { initializeApp, getApps, type ServiceAccount, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

import type { RequestHandler } from './$types';

import { error, json } from '@sveltejs/kit';
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
		const count = (await db.collection('pending_users').count().get()).data().count;
		if (count > 0) throw error(400, 'Already requested');

		const user = { email: decoded.email, name: decoded.name };
		await db.collection('pending_users').doc(decoded.uid).set(user);

		return json({ user: user });
	});
}) satisfies RequestHandler;
