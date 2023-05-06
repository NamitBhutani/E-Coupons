<script lang="ts">
	import type { Actions } from './$types';
	export let form: Actions;
</script>

<h1>Register as User</h1>
<form action="?/registerUser" method="POST">
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
	<button type="submit">Register as User</button>
</form>

{#if form?.username}
	<p class="error">username is taken</p>
{/if}
