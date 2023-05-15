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

		const { error: err } = await locals.supabase.auth.signUp({
			email: email as string,
			password: password as string,
			options: {
				data: {
					username,
					isVendor: true
				}
			}
		});
		if (err instanceof AuthApiError && err.status === 400) {
			console.log(err);
			return fail(400, { data: email, error: JSON.stringify(err) });
		} else if (err?.status === 500) {
			return fail(500, {
				data: err,
				error: 'Oops something went wrong , Please try again later!'
			});
		}

		throw redirect(303, '/confirmemail');
	}
};
