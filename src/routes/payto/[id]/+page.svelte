<script lang="ts">
	export let data: PageData;
	import type { PageData } from './$types';
</script>

{#if data.session && data.vendorData[0].raw_user_meta_data.isVendor === true}
	<form action="?/payto" method="POST">
		<div class="grid">
			<div>
				<label class="payto" for="payto"
					>Paying To: {data.vendorData[0].raw_user_meta_data.username}</label
				>
				<label class="amount" for="amount">Enter the amount you want to pay-</label>
			</div>
			<div class="input">
				<input type="text" name="amount" id="amount" required />
			</div>
		</div>
		<button type="submit">Pay</button>
	</form>
{:else if !data.session}
	<h1>Not Logged In</h1>
	<a href="/login" role="button">Login</a>
{:else}
	<h1>Invalid Vendor</h1>
	<p>Vendor does not exist</p>
{/if}

<style>
	.payto,
	.amount {
		text-align: center;
		margin-bottom: 0.5rem;
	}
	form {
		width: 95%;
		margin-left: 2.5%;
		margin-top: 1rem;
	}
	.input {
		margin: auto;
		width: 100%;
	}
</style>
