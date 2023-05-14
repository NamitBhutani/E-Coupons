import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import { supabase } from '$lib/supabaseClient';
import { AuthApiError } from '@supabase/supabase-js';

export const load: PageServerLoad = async () => {};
export const actions: Actions = {
	registerVendor: async ({ request, locals }) => {
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
					isVendor: true
				}
			}
		});
		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, { error: 'Invalid email or password!' });
			}
			return fail(500, { error: 'Oops something went wrong , Please try again later!' });
		}

		throw redirect(303, '/confirmemail');
	}
};
