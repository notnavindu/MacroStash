import type { User } from '$lib/schemas/user.schema';
import axios from 'axios';
import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	setDoc
} from 'firebase/firestore';

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

export const getAllUsers = async () => {
	return await getDocs(collection(getFirestore(), 'users')).then((snap) => {
		return snap.docs.map((user) => {
			return {
				id: user.id,
				...user.data()
			} as User;
		});
	});
};

export const getPendingUsers = async () => {
	return await getDocs(collection(getFirestore(), 'pending_users')).then((snap) => {
		return snap.docs.map((user) => {
			return {
				id: user.id,
				...user.data()
			} as User;
		});
	});
};

export const approveUser = async (uid: string) => {
	const db = getFirestore();

	const user = await (await getDoc(doc(db, 'pending_users', uid))).data();

	if (user) {
		await deleteDoc(doc(db, 'pending_users', uid));
		return await setDoc(doc(getFirestore(), 'users', uid), { ...user });
	}
};

export const rejectUser = async (uid: string) => {
	const db = getFirestore();
	await deleteDoc(doc(db, 'pending_users', uid));
};
