<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1>SERVING AS HOME PAGE FOR NOW</h1>
{#if data.session}
	<p>Welcome, {data.session.user.email}!</p>
	<form action="/logout">
		<button type="submit"> Logout </button>
	</form>
{:else}
	<div>
		<a href="/login">Login</a>
		<a href="/register"> Register</a>
	</div>
{/if}
