import { supabase } from '$lib/supabaseClient';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({}) => {
	const {
		data: { user }
	} = await supabase.auth.getUser();
	return {
		isValid: { user }
	};
};
//let metadata = user.user.metadata;
