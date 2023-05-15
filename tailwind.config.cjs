/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],

	daisyui: {
		styled: true,
		themes: ['dark'],
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		darkTheme: 'dark'
	}
};
