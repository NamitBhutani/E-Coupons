import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import { supabase } from '$lib/supabaseClient';
import bcrypt from 'bcrypt';

enum AccessRoles {
	USER = 'USER',
	VENDOR = 'VENDOR'
}

export const load: PageServerLoad = async () => {};
export const actions: Actions = {
	register: async ({ request }) => {
		const data = await request.formData();
		const username = data.get('username');
		const email = data.get('email');
		const password = data.get('password');

		const { error }: any = await supabase.from('vendors').insert({
			username,
			email,
			password,
			id: crypto.randomUUID(),
			isVendor: true
		});
		if (error) {
			console.log(error);
		}

		throw redirect(303, '/login');
	}
};
