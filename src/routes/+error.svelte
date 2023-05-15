<script>
	import { page } from '$app/stores';
</script>

{#if $page.error}
	<h1 class="text-5xl text-center text-red-500">{$page.error.message}</h1>
	<div class="flex items-center justify-center">
		<a href="/" role="button" class="btn btn-md">Back to Home 🚀!</a>
	</div>
{/if}
