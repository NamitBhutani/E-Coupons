<script lang="ts">
</script>

<div class="flex justify-center items-center custom-height">
	<div>
		<form method="POST" action="?/login" class="grid grid-cols-1 gap-6">
			<input
				type="text"
				name="email"
				class="input input-bordered w-full max-w-xs"
				placeholder="Email"
			/>

			<input
				type="password"
				name="password"
				class="input input-bordered w-full max-w-xs"
				placeholder="Password"
			/>
			<button type="submit" class="btn">Login as Vendor</button>
		</form>
		<form class="oauth flex justify-center items-center mt-4" method="POST">
			<button class="btn" type="submit" formaction="?/login&provider=google">
				Login with Google (NOT FOR VENDORS)
			</button>
		</form>
	</div>
</div>

<style>
	.custom-height {
		height: 60vh;
	}
</style>
