<script lang="ts">
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	export let data: PageData;
	export let form: ActionData;
	import type { PageData, ActionData, SubmitFunction } from './$types';

	if (form?.err) {
		toast.error(form.err.message);
	}
	const formValidation: SubmitFunction = ({ data, cancel }) => {
		const { amount } = Object.fromEntries(data);
		if (amount.length < 1) {
			toast.error('Amount cannot be empty!', {
				style: 'border-radius: 200px; background: #333; color: #fff;'
			});
			cancel();
		}

		return async ({ result, update }) => {
			if (result.type === 'success') {
				toast.success('Successfully Transferred 🤑!', {
					style: 'border-radius: 200px; background: #333; color: #fff;'
				});
				await update();
			}
		};
	};
</script>

{#if data.session && data.vendorData[0].raw_user_meta_data.isVendor === true}
	<div class="flex justify-center items-center">
		<form action="?/payto" method="POST" class="w-full max-w-xs" use:enhance={formValidation}>
			<div>
				<div class="text-center">
					<label class="payto text-2xl" for="payto">
						Paying To: <span class="font-bold"
							>{data.vendorData[0].raw_user_meta_data.username}</span
						>
					</label>
				</div>
				<label class="input-group mt-4">
					<span>₹</span>
					<input
						type="text"
						name="amount"
						id="amount"
						placeholder="Amount"
						class="input input-bordered input-lg w-full max-w-xs"
					/>
				</label>
			</div>
			<button type="submit" class="btn btn-md w-full mt-4 text-xl">Pay</button>
		</form>
	</div>
{:else if !data.session}
	<div class="flex justify-center items-center custom-height">
		<div class="grid grid-rows-2 grid-cols-1 gap-4 text-center px-4">
			<h1 class="alert alert-error font-bold text-xl">❌ Please login first to make a payment!</h1>
			<a href="/login" role="button" class="btn btn-md text-xl">Login</a>
		</div>
	</div>
{:else}
	<div class="flex justify-center items-center custom-height">
		<div class="grid grid-rows-2 grid-cols-1 gap-4 text-center px-4">
			<h1 class="alert alert-error font-bold text-xl">❌ Invalid Vendor ID <br /> 😖</h1>
			<a href="/" role="button" class="btn btn-md text-l">Pay Using Vendor Name</a>
		</div>
	</div>
{/if}
