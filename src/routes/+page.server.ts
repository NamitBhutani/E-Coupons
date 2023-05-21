import type { PageServerLoad, Actions } from './$types';
import { supabase } from '$lib/supabaseClient';
import { error, fail } from '@sveltejs/kit';
let loadeddatainFormAction: string;
let newAmount: number;

export const actions: Actions = {
	add: async ({ request, locals }) => {
		const formdata = await request.formData();
		const amount = <string>(<unknown>formdata.get('amount')); // type casting the data.get('amount') to number to be able to assign to the variable
		const session = await locals.getSession();

		const { data: loadData, error: loadErr } = await supabase
			.from('profiles')
			.select('balance')
			.eq('id', session?.user.id)
			.single(); // Returns the data in a single object instead of an array(really cool find from the docs :D)
		if (loadErr) {
			return fail(500, {
				err: loadErr,
				message: 'Vendor not found. Please try again later.'
			});
		} else {
			loadeddatainFormAction = loadData.balance;
			console.log(loadData.balance);
		}

		newAmount = parseFloat(amount) + parseFloat(loadeddatainFormAction);

		const { error: err } = await supabase
			.from('profiles')
			.update({ balance: newAmount })
			.eq('id', session?.user.id);
		if (err) {
			return fail(500, {
				err: loadErr,
				message: 'Oops! The transaction failed. Please try again later.'
			});
		}
	} //updating the balance of the vendor
};
export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	const { data: loadData, error: err } = await supabase
		.from('profiles')
		.select('balance, paidorreceive')
		.eq('email', session?.user.email)
		.single(); // Returns the data in a single object instead of an array(really cool find from the docs :D)
	return {
		userBalance: loadData
	};
};
