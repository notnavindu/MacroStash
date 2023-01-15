import { initializeApp, getApps, type ServiceAccount, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

import { error, json } from '@sveltejs/kit';
import { config } from '$config/firebaseConfig';

if (getApps().length === 0) {
	initializeApp({
		credential: cert(config as ServiceAccount)
	});
}

export async function GET({ request }: any) {
	const token = request.headers.get('firebase-token');

	if (!token) throw error(403, { message: 'No token' });
	const auth = getAuth();

	return auth.verifyIdToken(token).then((decoded) => {
		console.log(decoded.email);
		return json({ user: decoded });
	});

	return json({ status: 'sdkfjh' });
}
