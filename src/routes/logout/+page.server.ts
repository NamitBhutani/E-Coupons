import { error, redirect } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';
//import type {Actions} from 'module';
export const actions: Actions = {
	default: async ({ locals }) => {
		const { error: err } = await locals.supabase.auth.signOut();
		if (err) {
			throw error(500, 'Oops, something went wrong!');
		}
		throw redirect(303, '/');
	}
};
