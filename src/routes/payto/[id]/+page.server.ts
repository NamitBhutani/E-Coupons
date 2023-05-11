import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';
export const load: PageServerLoad = async ({ params }) => {
	const { data, error: err } = await supabase
		.from('profiles')
		.select('balance,raw_user_meta_data ')
		.eq('id', params.id);
	if (err) throw error(404, "Couldn't find that user");
	else
		return {
			vendorData: data
		};
};
