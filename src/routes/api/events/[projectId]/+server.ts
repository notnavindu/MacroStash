import { initializeApp, getApps, type ServiceAccount, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import type { RequestHandler } from '../$types';
import { z } from 'zod';

import { error, json } from '@sveltejs/kit';
import { eventSchema, type Event } from '$lib/schemas/event.schema';
import type { Project } from '$lib/schemas/project.schema';
import { config } from '$config/firebaseConfig';
import { isDemo } from '$config/demo';

if (getApps().length === 0) {
	initializeApp({
		credential: cert(config as ServiceAccount)
	});
}

export const POST = (async ({ request, getClientAddress, params }) => {
	if (isDemo) {
		throw error(400, { message: 'You cannot use this endpoint in demo mode' });
	}

	const event = (await request.json()) as Partial<Event>;

	const clientIp = getClientAddress();

	// @ts-ignore
	const projectId = params.projectId;

	event.timestamp = new Date();
	event.projectId = projectId;

	try {
		eventSchema.parse(event);
	} catch (err) {
		if (err instanceof z.ZodError) {
			throw error(400, { message: 'Request body error', errors: err.format() });
		}
	}

	const db = await getFirestore();
	const project = (await db.collection('projects').doc(projectId).get()).data() as Project;

	if (!project) throw error(400, { message: 'Invalid project Id' });

	if (!project.allowedDomains.includes('*') && !project.allowedDomains.includes(clientIp))
		throw error(400, {
			message: `Requests from ${clientIp} are not allowed. Add ${clientIp} to whitelist of this project`
		});

	const res = await db.collection('events').add(event);

	return json({
		success: true
	});
}) satisfies RequestHandler;
