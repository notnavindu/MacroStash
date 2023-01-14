import { initializeApp, getApps, type ServiceAccount, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

import type { RequestHandler } from './$types';
import { z } from 'zod';

import config from '$config/firebase-config.json';
import { error, json } from '@sveltejs/kit';
import { eventSchema, type Event } from '$lib/schemas/event.schema';

if (getApps().length === 0) {
	initializeApp({
		credential: cert(config as ServiceAccount)
	});
}

export const POST = (async ({ request }) => {
	let event = (await request.json()) as Partial<Event>;
	event.timestamp = new Date();

	try {
		eventSchema.parse(event);
	} catch (err) {
		if (err instanceof z.ZodError) {
			throw error(400, { message: 'Request body error', errors: err.format() });
		}
	}

	const db = await getFirestore();

	const res = await db.collection('projects').add(event);

	return json({
		success: true
	});
}) satisfies RequestHandler;
