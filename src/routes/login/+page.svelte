<script lang="ts">
	export let form: ActionData;
	import { enhance } from '$app/forms';
	import type { ActionData, SubmitFunction } from './$types';
	import toast from 'svelte-french-toast';

	if (form?.message) {
		toast.error(form.message, {
			style: 'border-radius: 200px; background: #333; color: #fff;'
		});
	}
	const formValidation: SubmitFunction = ({ data, cancel }) => {
		const { email, password } = Object.fromEntries(data);
		if (email.length < 1 || password.length < 1) {
			toast.error('Email and Password cannot be empty!', {
				style: 'border-radius: 200px; background: #333; color: #fff;'
			});
			cancel();
		}
		return async ({ result, update }) => {
			if (result.type === 'failure') {
				toast.error('Please check your email or password!', {
					style: 'border-radius: 200px; background: #333; color: #fff;'
				});
			} else await update();
		};
	};
</script>

<div class="flex justify-center items-center">
	<div>
		<form
			method="POST"
			action="?/login"
			class="grid grid-cols-1 gap-6"
			use:enhance={formValidation}
		>
			<input
				type="text"
				name="email"
				class="input input-bordered input-lg w-full max-w-xs"
				placeholder="Email"
			/>

			<input
				type="password"
				name="password"
				class="input input-bordered input-lg w-full max-w-xs"
				placeholder="Password"
			/>
			<button type="submit" class="btn btn-md">Login as Vendor</button>
		</form>
		<form class="oauth flex justify-center items-center mt-4" method="POST" use:enhance>
			<button
				class=" btn btn-md"
				type="submit"
				formaction="?/login&provider=google"
				data-sveltekit-preload-data
			>
				Login with Google (NOT FOR VENDORS)
			</button>
		</form>
	</div>
</div>
