<script lang="ts">
	import { enhance } from '$app/forms';
	//export let form: ActionData || Actions
	export let formVal: ActionData;
	export let form: Actions;
	import type { ActionData, Actions, SubmitFunction } from './$types';
	import toast from 'svelte-french-toast';

	//let isValid: boolean;
	//const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	//const emailValidate = () => {
	//isValid = regex.test(email);
	//};

	const formValidation: SubmitFunction = ({ data, cancel }) => {
		const { email, password } = Object.fromEntries(data);
		if (email.length < 1 || password.length < 1) {
			toast.error('Email and Password cannot be empty!');
			cancel();
		} else if (password.length < 8) {
			toast.error('Password must be at least 8 characters long!');
			cancel();
		} else if (formVal?.error) {
			toast.error(formVal.error);
			cancel();
		} else toast.error('Email already exists!');
	};
</script>

<h1 class="text-4xl text-center mt-12 font-bold">Register as Vendor</h1>

<div class="flex justify-center items-center custom-height">
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
				required
				class="input input-bordered w-full"
			/>

			<input
				type="email"
				name="email"
				id="email"
				placeholder="Email"
				required
				class="input input-bordered w-full"
			/>

			<input
				type="password"
				name="password"
				id="password"
				placeholder="Password"
				required
				class="input input-bordered w-full max-w-xs"
			/>

			<button class="btn" type="submit">Register as Vendor</button>
		</form>
	</div>
</div>

{#if form?.username}
	<p class="error">username is taken</p>
{/if}

<style>
	.custom-height {
		height: 35vh;
	}
</style>
