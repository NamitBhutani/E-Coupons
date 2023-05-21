<script lang="ts">
	import { enhance } from '$app/forms';
	import { supabase } from '$lib/supabaseClient';
	import toast from 'svelte-french-toast';
	import type { PageData, SubmitFunction } from './$types';
	import QRCode from 'qrcode';
	import { onMount } from 'svelte';
	import { Html5Qrcode } from 'html5-qrcode';
	import { redirect } from '@sveltejs/kit';

	export let data: PageData;
	let balance: any;

	onMount(async () => {
		if (data?.session?.user.user_metadata.isVendor == undefined || null) {
			const {
				data: { user }
			} = await supabase.auth.getUser();

			const { data: loadData, error: err } = await supabase
				.from('profiles')
				.select('balance')
				.eq('email', user?.email)
				.single();
			if (err) {
				//return fail(500, { message: 'Something went wrong on our side 😓' });
			} else balance = loadData.balance;
		}
	}); // for user balance fetching
	//export let form: ActionData;

	const formValidation: SubmitFunction = ({ data, cancel }) => {
		const { amount } = Object.fromEntries(data);
		if (amount.length < 1 || <number>(<unknown>amount) < 0) {
			toast.error(' Invalid amount!', {
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
			} else
				toast.error('Something went wrong try again later', {
					style: 'border-radius: 200px; background: #333; color: #fff;'
				});
		};
	};
	let qrDataURL: string;
	let uuid: string;
	let showParagraph: boolean = false;
	let userBalanceRealtime: any;
	onMount(async () => {
		if (data?.session?.user.user_metadata.isVendor == true) {
			uuid = data.session.user.id;
			qrDataURL = await QRCode.toDataURL(`/payto/${uuid}`);
		}
	});
	const toggleBalanceView = () => {
		showParagraph = !showParagraph;
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
	let showLogs: boolean = false;
	const handleShow = () => {
		showLogs = !showLogs;
	};

	//SCANNER LOGIC
	let scanning: boolean = false;
	let scanneraddress: string = '';
	let html5Qrcode: any;
	let scansuccess: boolean = false;

	onMount(init);

	function init() {
		html5Qrcode = new Html5Qrcode('reader');
	}

	function start() {
		html5Qrcode.start(
			{ facingMode: 'environment' },
			{
				fps: 20,
				qrbox: { width: 200, height: 200 }
			},
			onScanSuccess,
			onScanFailure
		);
		scanning = true;
	}

	function stop() {
		html5Qrcode.stop();
		return 'Click on the button to go the payments!';
		//scanning = false;
	}

	function onScanSuccess(decodedText: string, decodedResult: any) {
		scanneraddress = decodedText;
		scansuccess = true;

		//alert(`Code matched = ${decodedText}, `);
		//.log(decodedResult);
	}

	function onScanFailure(error: any) {
		//console.warn(`Code scan error = ${error}`);
	}
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
					<span class="font-bold">Current Balance:</span> ₹{userBalanceRealtime ??
						data.userBalance?.balance}
				</p>
			{/if}
			<button class="btn btn-md mx-2" on:click={toggleBalanceView}
				>{#if showParagraph} Hide Balance {:else} Show Balance{/if}</button
			>
			<div class="flex items-center justify-center max-w-lg">
				<img src={qrDataURL} alt="qrcode" class="rounded-md" />
			</div>
			<form method="POST" action="/logout" class="flex items-center justify-center">
				<button class="btn btn-md px-14" type="submit"> Logout </button>
			</form>
			<button class="btn btn-md w-full mt-4 text-xl mb-4" on:click={handleShow}
				>Confirmation/Transactions</button
			>
			{#if data.userBalance?.paidorreceive && showLogs}
				{#each data.userBalance.paidorreceive as item}
					<div class="text-center">
						<div class="badge badge-lg p-6">
							Received ₹ {item.amount} from {item.from} <br />
							Confirmation Hash : {item.hash}
						</div>
					</div>
				{/each}
			{/if}
		{:else if data.session !== null && data.session.user.user_metadata.name !== null}
			<p class="text-2xl text-center mx-1">
				Welcome to the User Screen, {data.session.user.user_metadata.name}!
			</p>
			{#if showParagraph}
				<p class="text-2xl text-center mx-1">
					<span class="font-bold">Current Balance:</span> ₹ {userBalanceRealtime ?? balance}
				</p>
			{/if}
			<button class="btn btn-md mx-2" on:click={toggleBalanceView}
				>{#if showParagraph} Hide Balance {:else} Show Balance{/if}</button
			>
			<div class="flex justify-center items-center">
				<div>
					<form
						method="POST"
						action="?/add"
						class="flex justify-center items-center gap-4"
						use:enhance={formValidation}
					>
						<label class="input-group">
							<span>₹</span>
							<input
								type="number"
								name="amount"
								placeholder="Amount"
								class="input input-bordered input-lg w-full max-w-xs col-span-1"
							/>
						</label>

						<div>
							<button class="btn btn-md w-full" type="submit">Add Money to your account</button>
						</div>
					</form>
					<form method="POST" action="/logout" class="flex justify-center items-center mt-4">
						<button type="submit" class="btn btn-md w-full">Logout</button>
					</form>
				</div>
			</div>
			<reader id="reader" />

			{#if scanning && scansuccess}
				<a href={scanneraddress} class="btn btn-md w-full">Go to Payments Page</a>
				<div class="text-center">{stop()}</div>
				<!-- <button on:click={stop} class="btn btn-md w-full">Stop Scanning</button> -->
			{:else}
				<button on:click={start} class="btn btn-md w-full">Scan To Pay</button>
			{/if}
		{:else}
			<div class="flex justify-center gap-7 mt-2">
				<a href="/login" role="button" class="btn btn-md item text-2xl">Login</a>
				<a href="/register/vendor" role="button" class="btn btn-md text-2xl"> Register</a>
			</div>
		{/if}
	</div>
</div>
