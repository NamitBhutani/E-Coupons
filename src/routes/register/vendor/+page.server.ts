import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import { supabase } from '$lib/supabaseClient';
import { AuthApiError } from '@supabase/supabase-js';

export const load: PageServerLoad = async () => {
	const { data: vendorEmail, error: err } = await supabase
		.from('profiles')
		.select('email')
		.eq('raw_user_meta_data->>isVendor', true)
	if (err) { throw fail(404, { message: "NO LOAD" }) }
	else return {
		Data: { vendorEmail }
	}
};
export const actions: Actions = {
	registerVendor: async ({ request, locals }) => {
		const body = await request.formData();
		const username = body.get('username');
		const email = body.get('email');
		const password = body.get('password');
		const { data: data, error: err } = await locals.supabase.auth.signUp({
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
		else if (data.user?.identities?.length === 0) {
			return fail(402, {
				data: err,
				error: 'Oops Already registered!'
			})
		}

		throw redirect(303, '/confirmemail');
	}
};
