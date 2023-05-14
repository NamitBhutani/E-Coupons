<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import '../app.css';
	export let data: LayoutData;

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

<div class="flex justify-center mt-24 items-center">
	<img src="/favicon.svg" alt="logo" class="img" />
</div>

<slot />

<style>
	.img {
		max-width: 14rem;
		min-width: 1rem;
	}
</style>
