<script lang="ts">
	import { enhance } from '$app/forms';
	//export let form: ActionData;
	import type { ActionData, SubmitFunction } from './$types';
	import toast from 'svelte-french-toast';

	const formValidation: SubmitFunction = ({ data, cancel }) => {
		const { email, password } = Object.fromEntries(data);
		if (email.length < 1 || password.length < 1) {
			toast.error('Email and Password cannot be empty!', {
				style: 'border-radius: 200px; background: #333; color: #fff;'
			});
			cancel();
		} else if (password.length < 8) {
			toast.error('Password must be at least 8 characters long!', {
				style: 'border-radius: 200px; background: #333; color: #fff;'
			});
			cancel();
		}
		return async ({ result, update }) => {
			if (result.type === 'failure' && result.status === 400) {
				toast.error('User Already exists!', {
					style: 'border-radius: 200px; background: #333; color: #fff;'
				});
			} else if (result.type === 'success') {
				toast.error('Successfully registered!', {
					style: 'border-radius: 200px; background: #333; color: #fff;'
				});
			} else await update();
		};
	};
</script>

<h1 class="text-4xl text-center mt-12 font-bold">Register as Vendor</h1>

<div class="flex justify-center items-center mt-20">
	<div>
		<form
			action="?/registerVendor"
			method="POST"
			class="grid grid-cols-1 gap-6"
			use:enhance={formValidation}
		>
			<input
				type="text"
				name="username"
				id="username"
				placeholder="Username"
				class="input input-bordered input-lg w-full max-w-xs"
			/>

			<input
				type="email"
				name="email"
				id="email"
				placeholder="Email"
				class="input input-bordered input-lg w-full max-w-xs"
			/>

			<input
				type="password"
				name="password"
				id="password"
				placeholder="Password"
				class="input input-bordered input-lg w-full max-w-xs"
			/>
			<!-- <p>{form?.error}</p> -->
			<button class="btn btn-md" type="submit">Register as Vendor</button>
		</form>
	</div>
</div>
