import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
export const actions: Actions = {
	login: async ({ request, locals }) => {
		const body = await request.formData();
		const email = body.get('email');
		const password = body.get('password');

		const { data, error: err } = await locals.supabase.auth.signInWithPassword({
			email: email as string,
			password: password as string
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, { error: 'Invalid email or password' });
			} else return fail(500, { error: 'Oops, something went wrong!' });
		}
		throw redirect(303, '/');
	}
};
