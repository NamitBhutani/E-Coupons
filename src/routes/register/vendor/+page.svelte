<script lang="ts">
	import type { Actions } from './$types';
	export let form: Actions;
</script>

<h1>Register as Vendor</h1>
<form action="?/registerVendor" method="POST">
	<div class="grid">
		<div>
			<label for="username">Username</label>
			<input type="text" name="username" id="username" required />
		</div>
		<div>
			<label for="email">Email</label>
			<input type="email" name="email" id="email" required />
		</div>
		<div>
			<label for="password">Password</label>
			<input type="password" name="password" id="password" required />
		</div>
	</div>
	<button type="submit">Register as Vendor</button>
</form>

{#if form?.username}
	<p class="error">username is taken</p>
{/if}

<style>
	h1 {
		text-align: center;
		margin-top: 1rem;
	}
	form {
		width: 95%;
		margin-left: 2.5%;
	}
</style>
