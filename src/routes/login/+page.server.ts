import { AuthApiError, type Provider } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ request, locals, url }) => {
		const provider = url.searchParams.get('provider') as Provider;
		if (provider) {
			const { data, error: err } = await locals.supabase.auth.signInWithOAuth({
				provider: provider
			});

			if (err) {
				return fail(400, { message: 'Oops try again later!' });
			}

			throw redirect(303, `${data.url}&hd=hyderabad.bits-pilani.ac.in`);
		}
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
