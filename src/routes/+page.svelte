<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1>Welcome to E-Coupons</h1>
{#if data.session}
	<p>Welcome, {data.session.user.email}!</p>
{:else}
	<div>
		<a href="/login">Login</a>
		<a href="/register"> Register</a>
	</div>
{/if}
