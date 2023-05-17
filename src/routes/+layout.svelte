<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import '../app.css';
	export let data: LayoutData;
	import { Toaster } from 'svelte-french-toast';

	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<main class="mx-5 my-20">
	<Toaster />
	<div class="flex justify-center items-center mb-20">
		<img src="/favicon.svg" alt="logo" class="img" />
	</div>
	<slot />
</main>

<style>
	.img {
		max-width: 14rem;
		min-width: 1rem;
	}
</style>
