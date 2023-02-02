import { initializeApp, getApps, type ServiceAccount, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

import type { RequestHandler } from './$types';

import { error, json } from '@sveltejs/kit';
import { PUBLIC_DEMO } from '$env/static/public';
import { config } from '$config/firebaseConfig';
import { isDemo } from '$config/demo';

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
			const count = (await db.collection('users').count().get()).data().count;
			if (isDemo && count > 0) throw error(403, 'Unauthorized');

			user = { email: decoded.email, name: decoded.name, primary: isDemo };
			await db.collection('users').doc(decoded.uid).set(user);
		}

		return json({ user: user });
	});
}) satisfies RequestHandler;
