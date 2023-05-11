<script lang="ts">
	import type { PageData } from './$types';
	import QRCode from 'qrcode';
	import { onMount } from 'svelte';
	export let data: PageData;
	let qrDataURL: string;
	let uuid: string;
	onMount(async () => {
		if (data?.session?.user.user_metadata.isVendor == true) {
			uuid = data.session.user.id;
			qrDataURL = await QRCode.toDataURL(`ecoupons.vercel/payto/${uuid}`);
		}
	});
</script>

<h1>Welcome to E-Coupons!</h1>
{#if data.session && data.session.user.user_metadata.isVendor === true}
	<p>Welcome to the Vendor Screen, {data.session.user.user_metadata.username}!</p>
	<div class="img">
		<img src={qrDataURL} alt="" />
	</div>
	<form method="POST" action="/logout">
		<button type="submit"> Logout </button>
	</form>
{:else if data.session && data.session.user.user_metadata.isVendor === null}
	<p>Current Balance:</p>
	<form method="POST" action="/pay">
		<input type="number" name="amount" placeholder="Amount" />
		<input type="text" name="vendorName" placeholder="Vendor Username" />
		<button type="submit"> Pay </button>
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
