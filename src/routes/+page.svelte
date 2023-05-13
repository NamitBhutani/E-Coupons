<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import type { PageData } from './$types';
	import QRCode from 'qrcode';
	import { onMount } from 'svelte';
	//import { error } from '@sveltejs/kit';
	export let data: PageData;
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

<h1>Welcome to E-Coupons!</h1>
{#if data.session !== null && data.session.user.user_metadata.isVendor === true}
	<p>Welcome to the Vendor Screen, {data.session.user.user_metadata.username}!</p>
	{#if showParagraph}
		<p>Current Balance: {userBalanceVar || data.userBalance?.balance}</p>
	{/if}
	<button on:click={toggleBalanceView}
		>{#if showParagraph} Hide Balance {:else} Show Balance{/if}</button
	>
	<div class="img">
		<img src={qrDataURL} alt="" />
	</div>
	<form method="POST" action="/logout">
		<button type="submit"> Logout </button>
	</form>
{:else if data.session !== null && data.session.user.user_metadata.name !== null}
	<p>Welcome to the User Screen, {data.session.user.user_metadata.name}!</p>
	{#if showParagraph}
		<p>Current Balance: {userBalanceVar || data.userBalance?.balance}</p>
	{/if}
	<button on:click={toggleBalanceView}
		>{#if showParagraph} Hide Balance {:else} Show Balance{/if}</button
	>
	<form method="POST" action="?/payto">
		<input type="number" name="amount" placeholder="Amount" />
		<input type="text" name="vendorName" placeholder="Vendor Username" />
		<button type="submit"> Pay </button>
	</form>
	<form method="POST" action="/logout">
		<button type="submit"> Logout </button>
	</form>
{:else}
	<div class="grid">
		<a href="/login" role="button">Login</a>
		<a href="/register/vendor" role="button"> Register</a>
	</div>
{/if}

<style>
	h1,
	p {
		text-align: center;
		padding: 1rem;
	}
	a,
	button {
		width: 95%;
		margin: 2.5%;
	}

	.img {
		text-align: center;
	}
</style>
