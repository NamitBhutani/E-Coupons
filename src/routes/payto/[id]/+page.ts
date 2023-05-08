import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';
export const load: PageServerLoad = async ({ params }) => {
	const fetchBalance = async (idapp: string) => {
		const { data } = await supabase.from('users').select('vendorbalance').eq('id', 'idapp');
		return data;
	};

	return {
		vendorBalance: fetchBalance(params.id)
	};
};
