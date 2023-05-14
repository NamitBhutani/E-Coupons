<script lang="ts">
	import { enhance } from '$app/forms';
	import { supabase } from '$lib/supabaseClient';
	import toast from 'svelte-french-toast';
	import type { ActionData, PageData, SubmitFunction } from './$types';
	import QRCode from 'qrcode';
	import { onMount } from 'svelte';
	export let data: PageData;
	export let form: ActionData;

	if (form?.err) {
		toast.error(form.err.message);
	}
	const formValidation: SubmitFunction = ({ data, cancel }) => {
		const { amount, vendorName } = Object.fromEntries(data);
		if (amount.length < 1 || vendorName.length < 1) {
			toast.error(' Amount or Vendor Username cannot be empty!', {
				style: 'border-radius: 200px; background: #333; color: #fff;'
			});
			cancel();
		}
	};
	let qrDataURL: string;
	let uuid: string;
	let showParagraph: boolean = false;
	let userBalanceVar: any;
	onMount(async () => {
		if (data?.session?.user.user_metadata.isVendor == true) {
			uuid = data.session.user.id;
			qrDataURL = await QRCode.toDataURL(`ecoupons.vercel.app/payto/${uuid}`);
		}
	});
	const toggleBalanceView = () => {
		showParagraph = !showParagraph;
	};

	const userBalance = supabase
		.channel('getUserBalance')
		.on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'profiles' }, (payload) => {
			userBalanceVar = payload.new.balance;
			//console.log('Changes Received', userBalanceVar);
		})
		.subscribe();
</script>

<div class="flex items-center justify-center">
	<div class="grid grid-rows-2 gap-10">
		<h1 class="text-5xl text-center">Welcome to E-Coupons!</h1>
		{#if data.session !== null && data.session.user.user_metadata.isVendor === true}
			<p class="text-2xl text-center mx-1">
				Welcome to the Vendor Screen, {data.session.user.user_metadata.username}!
			</p>
			{#if showParagraph}
				<p class="text-2xl text-center mx-1">
					<span class="font-bold">Current Balance:</span> ₹{userBalanceVar ||
						data.userBalance?.balance}
				</p>
			{/if}
			<button class="btn mx-2" on:click={toggleBalanceView}
				>{#if showParagraph} Hide Balance {:else} Show Balance{/if}</button
			>
			<div class="flex items-center justify-center max-w-lg">
				<img src={qrDataURL} alt="qrcode" class="rounded-md" />
			</div>
			<form method="POST" action="/logout" class="flex items-center justify-center">
				<button class="btn px-14" type="submit"> Logout </button>
			</form>
		{:else if data.session !== null && data.session.user.user_metadata.name !== null}
			<p class="text-2xl text-center mx-1">
				Welcome to the User Screen, {data.session.user.user_metadata.name}!
			</p>
			{#if showParagraph}
				<p class="text-2xl text-center mx-1">
					<span class="font-bold">Current Balance:</span> ₹ {userBalanceVar ||
						data.userBalance?.balance}
				</p>
			{/if}
			<button class="btn mx-2" on:click={toggleBalanceView}
				>{#if showParagraph} Hide Balance {:else} Show Balance{/if}</button
			>
			<div class="flex justify-center items-center">
				<div>
					<form
						method="POST"
						action="?/payto"
						class="grid grid-cols-1 sm:grid-cols-2 gap-4"
						use:enhance={formValidation}
					>
						<label class="input-group">
							<span>₹</span><input
								type="number"
								name="amount"
								placeholder="Amount"
								class="input input-bordered w-full"
							/></label
						>
						<input
							type="text"
							name="vendorName"
							placeholder="Vendor Username"
							class="input input-bordered w-full"
						/>
						<div class="sm:col-span-2">
							<button class="btn w-full" type="submit">Pay</button>
						</div>
					</form>
					<form method="POST" action="/logout" class="flex justify-center items-center mt-4">
						<button type="submit" class="btn w-full">Logout</button>
					</form>
				</div>
			</div>
		{:else}
			<div class="flex justify-center gap-7 mt-2">
				<a href="/login" role="button" class="btn item text-2xl">Login</a>
				<a href="/register/vendor" role="button" class="btn text-2xl"> Register</a>
			</div>
		{/if}
	</div>
</div>
