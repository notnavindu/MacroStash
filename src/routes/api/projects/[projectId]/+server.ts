import { initializeApp, getApps, type ServiceAccount, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

import { error, json } from '@sveltejs/kit';
import { config } from '$config/firebaseConfig';
import { getFirestore } from 'firebase-admin/firestore';
import { deleteDoc } from 'firebase/firestore';

if (getApps().length === 0) {
	initializeApp({
		credential: cert(config as ServiceAccount)
	});
}

// export async function GET({ request }: any) {
// 	const token = request.headers.get('firebase-token');

// 	if (!token) throw error(403, { message: 'No token' });
// 	const auth = getAuth();

// 	return auth.verifyIdToken(token).then((decoded) => {
// 		return json({ user: decoded });
// 	});

// }

// export async function DELETE({ request }: any) {
// 	const token = request.headers.get('firebase-token');

// 	// @ts-ignore
// 	const projectId = params.projectId;

// 	if (!token) throw error(403, { message: 'No token' });
// 	const auth = getAuth();

// 	const db = await getFirestore();

// 	return auth.verifyIdToken(token).then((decoded) => {
// 		await deleteDoc(doc(db, "cities", "DC"));
// 		return json({ success: true });
// 	});

// 	return json({ status: 'sdkfjh' });
// }
