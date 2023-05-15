<script lang="ts">
	export let data: PageData;
	import type { PageData } from './$types';
</script>

{#if data.session === null}
	<div class="mx-4 mt-40">
		<h1 class=" alert alert-info text-xl font-bold flex justify-center">
			ℹ️ Please Confirm your email address to proceed!
		</h1>
	</div>
{:else}
	<a href="/" role="button" class="btn btn-md text-l text-center font-bold"
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
