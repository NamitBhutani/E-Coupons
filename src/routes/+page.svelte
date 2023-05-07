<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	$: ({ isValid } = data);
</script>

<h1>Welcome to E-Coupons!</h1>
{#if data.session}
	<p>Welcome, {data.session.user.email}!</p>
	<form method="POST" action="/logout">
		<button type="submit"> Logout </button>
	</form>
	<p>{JSON.stringify(isValid)}</p>
{:else}
	<div class="grid">
		<a href="/login" role="button">Login</a>
		<a href="/register" role="button"> Register</a>
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
</style>
