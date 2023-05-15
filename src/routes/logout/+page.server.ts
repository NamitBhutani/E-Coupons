import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { Config } from '@sveltejs/adapter-vercel';

export const config: Config = {
	runtime: 'edge'
};

export const actions: Actions = {
	default: async ({ locals }) => {
		const { error: err } = await locals.supabase.auth.signOut();
		if (err) {
			throw error(500, 'Oops, something went wrong!');
		}
		throw redirect(303, '/');
	}
};
