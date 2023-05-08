<script lang="ts">
	export let data: PageData;
	import type { PageData } from './$types';
	let test = JSON.stringify(data);
</script>

<p>{test}</p>
