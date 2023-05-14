<script lang="ts">
	export let data: PageData;
	import type { PageData } from './$types';
</script>

{#if data.session && data.vendorData[0].raw_user_meta_data.isVendor === true}
	<div class="flex justify-center items-center custom-height">
		<form action="?/payto" method="POST" class="w-full max-w-xs">
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
						required
						placeholder="Amount"
						class="input input-bordered w-full"
					/>
				</label>
			</div>
			<button type="submit" class="btn w-full mt-4 text-xl">Pay</button>
		</form>
	</div>
{:else if !data.session}
	<div class="flex justify-center items-center custom-height">
		<div class="grid grid-rows-2 grid-cols-1 gap-4 text-center px-4">
			<h1 class="alert alert-error font-bold text-xl">❌ Please login first to make a payment!</h1>
			<a href="/login" role="button" class="btn text-xl">Login</a>
		</div>
	</div>
{:else}
	<div class="flex justify-center items-center custom-height">
		<div class="grid grid-rows-2 grid-cols-1 gap-4 text-center px-4">
			<h1 class="alert alert-error font-bold text-xl">❌ Invalid Vendor ID <br /> 😖</h1>
			<a href="/" role="button" class="btn text-l">Pay Using Vendor Name</a>
		</div>
	</div>
{/if}

<style>
	.custom-height {
		height: 50vh;
	}
</style>
