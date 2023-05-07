<script lang="ts">
	import QRCode from 'qrcode';
	import { onMount } from 'svelte';
	let qrDataURL: string;
	let uuid: string;
	onMount(async () => {
		uuid = 'sdfsdfsdfsdfds'; // add functionality to pull uuid from supabase tomorrow
		qrDataURL = await QRCode.toDataURL(uuid);
	});
</script>

<img src={qrDataURL} alt="Qrcode" />
