<script lang="ts">
	import QRCode from 'qrcode';
	import { onMount } from 'svelte';
	export let data: PageData;
	import type { PageData } from './$types';
	let qrDataURL: string;
	let uuid: string;

	onMount(async () => {
		if (data.metadata.isVendor == true) {
			uuid = `${JSON.stringify(data.user.id)}`;
			qrDataURL = await QRCode.toDataURL(uuid);
		}
	});
</script>

<div class="img">
	<img src={qrDataURL} alt="" />
</div>
