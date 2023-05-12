import type { PageServerLoad, Actions, PageData } from './$types';
import { supabase } from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';
let loadeddatainFormAction: number;

export const actions: Actions = {
	payto: async ({ request }) => {
		const data = await request.formData();
		let amount: number = <number>(<unknown>data.get('amount')); // type casting the data.get('amount') to number to be able to assign to the variable
		amount += loadeddatainFormAction;
		const vendorName = data.get('vendorName');

		const { error: err } = await supabase
			.from('profiles')
			.update({ balance: amount })
			.eq('raw_user_meta_data:username', vendorName);
		if (err) throw error(500, 'Oops! The transaction failed. Please try again later.');

		const { data: loadData, error: loadErr } = await supabase
			.from('profiles')
			.select('balance')
			.eq('raw_user_meta_data:username', vendorName)
			.single(); // Returns the data in a single object instead of an array(really cool find from the docs :D)
		if (loadErr) throw error(500, 'Oops! The transaction failed. Please try again later.');
		else loadeddatainFormAction = loadData?.balance;
	}
};

//Loading logged in User's Balance to show in the form

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	const { data: loadData, error: err } = await supabase
		.from('profiles')
		.select('balance')
		.eq('email', session?.user.email)
		.single();
	return {
		userBalance: loadData
	};
};
