<!-- <script lang="ts">
	export let data: PageData;
	import type { PageData } from './$types';
	//let { vendorBalance } = data;
</script> -->

<!-- <p>{vendorBalance}</p> -->
<form action="" method="POST">
	<div class="grid">
		<div>
			<label class="payto" for="payto">Paying To:</label>
			<label class="amount" for="amount">Enter the amount you want to pay-</label>
		</div>
		<div class="input">
			<input type="text" name="amount" id="amount" required />
		</div>
	</div>
	<button type="submit">Pay</button>
</form>

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
