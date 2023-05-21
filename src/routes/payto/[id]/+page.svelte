<script lang="ts">
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import { supabase } from '$lib/supabaseClient';
	export let data: PageData;
	export let formData: number;
	import type { PageData, SubmitFunction } from './$types';
	let userBalanceRealtime: any;
	let showLogs: boolean = false;
	const handleShow = () => {
		showLogs = !showLogs;
	};

	const userBalance = supabase
		.channel('getUserBalance')
		.on(
			'postgres_changes',
			{
				event: 'UPDATE',
				schema: 'public',
				table: 'profiles',
				filter: `id=eq.${data.session?.user.id}`
			},
			(payload) => {
				userBalanceRealtime = payload.new.balance;
			}
		)
		.subscribe();

	const formValidation: SubmitFunction = ({ data, cancel }) => {
		const { amount } = Object.fromEntries(data);
		if (amount.length < 1 || <number>(<unknown>amount) < 0) {
			toast.error('Invalid Amount!', {
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
			} else if (result.type === 'failure') {
				toast.error('Not enough money BROKE BOI 😖!', {
					style: 'border-radius: 200px; background: #333; color: #fff;'
				});
			}
		};
	};
</script>

{#if data.session && data.Data.vendorUsername[0].raw_user_meta_data.isVendor === true && data.session.user.user_metadata.isVendor !== true}
	<div class="flex justify-center items-center">
		<form action="?/payto" method="POST" class="w-full max-w-xs" use:enhance={formValidation}>
			<div>
				<div class="text-center">
					<label class="payto text-2xl" for="payto">
						Paying To: <span class="font-bold"
							>{data.Data.vendorUsername[0].raw_user_meta_data.username}</span
						>
					</label><br />
					<label class="payto text-2xl" for="payto">
						Your Balance: <span class="font-bold"
							>₹{userBalanceRealtime ?? data.Data.userBalanceData?.balance}</span
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
						bind:value={formData}
					/>
				</label>
			</div>
			<button type="submit" class="btn btn-md w-full mt-4 text-xl">Pay</button>
			<a href="/" class="btn btn-md w-full mt-4 text-xl">Home</a>
		</form>
	</div>

	<!-- Showing curent payment confirmation status -->
	<div>
		<form method="POST" action="/logout">
			<button class="btn btn-md w-full mt-4 text-xl" type="submit"> Logout </button>
		</form>
		<button class="btn btn-md w-full mt-4 text-xl mb-4" on:click={handleShow}
			>Confirmation/Transactions</button
		>
	</div>

	<hr />
	{#if data.Data.userBalanceData.paidorreceive && showLogs}
		{#each data.Data.userBalanceData.paidorreceive as item}
			<div class="text-center mt-4 mb-4">
				<div class="badge badge-lg p-6">
					Paid ₹ {item.amount} to {item.to} <br />
					Confirmation Hash : {item.hash}
				</div>
			</div>
		{/each}
	{/if}
{:else if !data.session}
	<div class="flex justify-center items-center custom-height">
		<div class="grid grid-rows-2 grid-cols-1 gap-4 text-center px-4">
			<h1 class="alert alert-error font-bold text-xl">❌ Please login first to make a payment!</h1>
			<a href="/login" role="button" class="btn btn-md text-xl">Login</a>
		</div>
	</div>
{:else if data.Data.vendorUsername[0].raw_user_meta_data.isVendor !== true}
	<div class="flex justify-center items-center custom-height">
		<div class="grid grid-rows-2 grid-cols-1 gap-4 text-center px-4">
			<h1 class="alert alert-error font-bold text-xl">❌ Invalid Vendor ID <br /> 😖</h1>
		</div>
	</div>
{:else}
	<div class="flex justify-center items-center custom-height">
		<div class="grid grid-rows-2 grid-cols-1 gap-4 text-center px-4">
			<h1 class="alert alert-error font-bold text-xl">❌ You can't pay another vendor!<br /> 😖</h1>
		</div>
	</div>
{/if}
