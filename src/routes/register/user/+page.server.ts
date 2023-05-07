import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import { supabase } from '$lib/supabaseClient';
import bcrypt from 'bcrypt';

export const load: PageServerLoad = async () => {};
export const actions: Actions = {
	registerUser: async ({ request, locals }) => {
		const body = await request.formData();
		const username = body.get('username');
		const email = body.get('email');
		const password = body.get('password');

		const { data, error: err } = await locals.supabase.auth.signUp({
			email: email as string,
			password: password as string,
			options: {
				data: {
					username,
					isVendor: false
				}
			}
		});

		if (err) {
			console.log(err);
		}

		throw redirect(303, '/confirmemail');
	}
};
