import { initializeApp, getApps, type ServiceAccount, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

import type { RequestHandler } from './$types';
import { z } from 'zod';

import config from '$config/firebase-config.json';
import { error, json } from '@sveltejs/kit';
import { projectSchema, type Project } from '$lib/schemas/project.schema';

if (getApps().length === 0) {
	initializeApp({
		credential: cert(config as ServiceAccount)
	});
}

export const GET = (async ({ request }) => {
	const token = request.headers.get('firebase-token');

	if (!token) throw error(403, { message: 'No token' });
	const auth = getAuth();

	const db = await getFirestore();

	return auth.verifyIdToken(token).then(async (decoded) => {
		const proj = (await db.collection('projects').get()).docs.map((doc) => {
			return {
				id: doc.id,
				...doc.data()
			};
		});

		return json({ projects: proj });
	});
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	let project = (await request.json()) as Partial<Project>;
	project.createdAt = new Date();

	const token = request.headers.get('firebase-token');

	if (!token) throw error(403, { message: 'No token' });
	const auth = getAuth();

	try {
		projectSchema.parse(project);
	} catch (err) {
		if (err instanceof z.ZodError) {
			throw error(400, { message: 'Request body error', errors: err.format() });
		}
	}

	const db = await getFirestore();

	return auth.verifyIdToken(token).then(async (decoded) => {
		const res = await db.collection('projects').add(project);

		return json({
			project: {
				id: res.id,
				...project
			}
		});
	});
}) satisfies RequestHandler;
