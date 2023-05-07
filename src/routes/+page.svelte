<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1>Welcom to E-Coupons!</h1>
{#if data.session}
	<p>Welcome, {data.session.user.email}!</p>
	<form method="POST" action="/logout">
		<button type="submit"> Logout </button>
	</form>
{:else}
	<div>
		<a href="/login" role="button">Login</a>
		<a href="/register" role="button"> Register</a>
	</div>
{/if}
