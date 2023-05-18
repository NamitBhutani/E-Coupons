import type { PageServerLoad, Actions } from './$types';
import { supabase } from '$lib/supabaseClient';
import { fail } from '@sveltejs/kit';
import type { Config } from '@sveltejs/adapter-vercel';

export const config: Config = {
	runtime: 'edge'
};
let loadeddatainFormAction: string; // defined a variable so that I can load the vendorBalance only when action is triggered and not on page load
let newAmount: number;
let newAmountforUser: number;
export const actions: Actions = {
	payto: async ({ params, request, locals }) => {
		const formdata = await request.formData();
		const amount = <string>(<unknown>formdata.get('amount')); // type casting the data.get('amount') to number to be able to assign to the variable

		const { data: loadData, error: loadErrforVendor } = await supabase
			.from('profiles')
			.select('balance')
			.eq('id', params.id)
			.single();
		// Returns the data in a single object instead of an array(really cool find from the docs :D)
		const session = await locals.getSession();
		const { data: loadDataforUser, error: loadErrforUser } = await supabase
			.from('profiles')
			.select('balance')
			.eq('id', session?.user.id)
			.single();

		if (loadErrforVendor || loadErrforUser)
			return fail(500, {
				message: 'Something went HORRIBLY wrong on our side 😓'
			});
		else if (parseFloat(loadDataforUser?.balance) >= parseFloat(amount)) {
			newAmount = parseFloat(amount) + parseFloat(loadData.balance);
			newAmountforUser = parseFloat(loadDataforUser?.balance) - parseFloat(amount);
		} else {
			return fail(500, { message: 'You do not have enough balance to make this transaction 🙅‍♀️' });
		}

		const { error: err } = await supabase
			.from('profiles')
			.update({ balance: newAmount })
			.eq('id', params.id);
		const { error: errforUser } = await supabase
			.from('profiles')
			.update({ balance: newAmountforUser })
			.eq('id', session?.user.id);

		if (err || errforUser)
			return fail(500, {
				message: 'Oops! The transaction failed. Please try again later.'
			});
	}
};
//Loading username from a variable declared in root directory and also loading vendor balance and raw_user_meta_data from supabase
//based on dynamic route params
export const load: PageServerLoad = async ({ params }) => {
	const { data, error: err } = await supabase
		.from('profiles')
		.select('raw_user_meta_data')
		.eq('id', params.id);

	if (err) throw fail(404, { message: "Couldn't find that Vendor" });
	else
		return {
			vendorData: data
		};
};
