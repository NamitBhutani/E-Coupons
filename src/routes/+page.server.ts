import type { PageServerLoad, Actions } from './$types';
import { supabase } from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';
let loadeddatainFormAction: string;
let newAmount: number;

export const actions: Actions = {
	payto: async ({ request }) => {
		const formdata = await request.formData();
		const amount = <string>(<unknown>formdata.get('amount')); // type casting the data.get('amount') to number to be able to assign to the variable
		const vendorName = formdata.get('vendorName');

		const { data: loadData, error: loadErr } = await supabase
			.from('profiles')
			.select('balance')
			.eq(`raw_user_meta_data->username`, JSON.stringify(vendorName))
			.single(); // Returns the data in a single object instead of an array(really cool find from the docs :D)
		if (loadErr) throw error(500, 'Oops! The transaction failed. Please try again later.');
		else loadeddatainFormAction = loadData.balance;

		newAmount = parseFloat(amount) + parseFloat(loadeddatainFormAction);

		const { error: err } = await supabase
			.from('profiles')
			.update({ balance: newAmount })
			.eq('raw_user_meta_data->username', JSON.stringify(vendorName));
		if (err) throw error(500, 'Oops! The transaction failed. Please try again later.');
	} //updating the balance of the vendor
};

//Loading logged in User's or Vendor's Balance to show in the form

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	const { data: loadData, error: err } = await supabase
		.from('profiles')
		.select('balance')
		.eq('email', session?.user.email)
		.single();
	if (err) console.log(JSON.stringify(err) + 'this error is from 2');
	else
		return {
			userBalance: loadData
		};
};
