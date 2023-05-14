<script>
	import { page } from '$app/stores';
</script>

{#if $page.error}
	<h1 class="text-5xl text-center text-red-500">{$page.error.message}</h1>
	<a href="/" role="button" class="btn">Back to Home 🚀!</a>
{/if}
