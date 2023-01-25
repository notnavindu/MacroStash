import { projectSchema, type Project } from '$lib/schemas/project.schema';
import {
	collection,
	doc,
	getDocs,
	getFirestore,
	serverTimestamp,
	setDoc
} from 'firebase/firestore';
import toast from 'svelte-french-toast';
import { z } from 'zod';

export const createProject = async (data: Project) => {
	try {
		projectSchema.parse(data);
	} catch (err) {
		if (err instanceof z.ZodError) {
			return toast.error('Parsing error');
		}
	}

	let docRef = doc(collection(getFirestore(), 'projects'));
	await setDoc(docRef, {
		...data,
		id: docRef.id,
		createdAt: serverTimestamp()
	});
};

export const getAllProjects = async () => {
	return (await getDocs(collection(getFirestore(), 'projects'))).docs.map((doc) => {
		return {
			id: doc.id,
			...doc.data()
		};
	}) as Project[];
};

export const updateProject = async (project: Project) => {
	return await setDoc(
		doc(getFirestore(), 'projects', project.id!),
		{ ...project },
		{ merge: true }
	);
};
