import { error, json } from '@sveltejs/kit';

export const POST = async ({ getClientAddress }: any) => {
	const clientIp = getClientAddress();

	return json({
		ip: clientIp
	});
};
