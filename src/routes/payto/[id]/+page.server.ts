import type { PageServerLoad, Actions } from './$types';
import { supabase } from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';
let loadeddatainFormAction: any; // defined a variable so that I can load the vendorBalance only when action is triggered and not on page load

export const actions: Actions = {
	payto: async ({ params, request }) => {
		const data = await request.formData();
		let amount: number = <number>(<unknown>data.get('amount')); // type casting the data.get('amount') to number to be able to assign to the variable
		amount += loadeddatainFormAction;
		const vendorName = data.get('vendorName');

		const { error: err } = await supabase
			.from('profiles')
			.update({ balance: amount })
			.match({ id: params.id, 'raw_user_meta_data:username': vendorName });
		if (err) throw error(500, 'Oops! The transaction failed. Please try again later.');

		const { data: loadData, error: loadErr } = await supabase
			.from('profiles')
			.select('balance')
			.eq('id', params.id)
			.single(); // Returns the data in a single object instead of an array(really cool find from the docs :D)
		if (loadErr) throw error(500, 'Oops! The transaction failed. Please try again later.');
		else loadeddatainFormAction = loadData?.balance;
	}
};
//Loading username from a variable declared in root directory and also loading vendor balance and raw_user_meta_data from supabase
//based on dynamic route params
export const load: PageServerLoad = async ({ params }) => {
	const { data, error: err } = await supabase
		.from('profiles')
		.select('raw_user_meta_data')
		.eq('id', params.id);

	if (err) throw error(404, "Couldn't find that user");
	else
		return {
			vendorData: data
		};
};
