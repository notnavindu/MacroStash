import type { Project } from '$lib/schemas/project.schema';
import { collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { api } from '.';

export const createProject = async (data: Project) => {
	return await api.post('/projects', data).then((res) => {
		return res.data.project;
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
