<script lang="ts">
</script>

<form method="POST" action="?/login">
	<div>Email:</div>
	<input type="text" name="email" />
	<div>Password:</div>
	<input type="password" name="password" />
	<button type="submit">Login as Vendor</button>
</form>
<form class="oauth" method="POST">
	<button type="submit" formaction="?/login&provider=google"
		>Login with Google-(NOT FOR VENDORS)</button
	>
</form>

<style>
	form {
		width: 95%;
		margin: 2.5%;
	}
</style>
