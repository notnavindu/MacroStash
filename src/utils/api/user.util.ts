import axios from 'axios';

export const handleLogin = async (token: string) => {
	return await axios.get('/api/user', { headers: { 'firebase-token': token } }).then((res) => {
		return res.data?.user;
	});
};

export const requestAccess = async (token: string) => {
	return await axios
		.get('/api/user/request', { headers: { 'firebase-token': token } })
		.then((res) => {
			return res.data?.user;
		});
};
