import { api } from '..';

export const testProfile = async () => {
	return await api.get('/hello').then((res) => {
		return res.data;
	});
};
