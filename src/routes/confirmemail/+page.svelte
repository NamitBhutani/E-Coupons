<script lang="ts">
	export let data: PageData;
	import type { PageData } from './$types';
</script>

{#if data.session === null}
	<h1>Please Confirm your email address to proceed!</h1>
{:else}
	<a href="/" role="button"
		>Your email is already confirmed! Click here to redirect to login page!</a
	>
{/if}

<style>
	h1 {
		text-align: center;
		padding: 1rem;
	}

	a {
		width: 95%;
		margin: 2.5%;
	}
</style>
