import type { Project } from '$lib/schemas/project.schema';
import { api } from '.';

export const createProject = async (data: Project) => {
	return await api.post('/projects', data).then((res) => {
		return res.data.project;
	});
};

export const getAllProjects = async () => {
	return await api.get('/projects').then((res) => {
		return res.data.projects;
	});
};
