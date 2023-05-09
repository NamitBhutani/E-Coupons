import { c as create_ssr_component } from "../../../../chunks/index3.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".payto.svelte-awmdik,.amount.svelte-awmdik{text-align:center;margin-bottom:0.5rem}form.svelte-awmdik{width:95%;margin-left:2.5%;margin-top:1rem}.input.svelte-awmdik{margin:auto;width:100%}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `


<form action="" method="POST" class="svelte-awmdik"><div class="grid"><div><label class="payto svelte-awmdik" for="payto">Paying To:</label>
			<label class="amount svelte-awmdik" for="amount">Enter the amount you want to pay-</label></div>
		<div class="input svelte-awmdik"><input type="text" name="amount" id="amount" required></div></div>
	<button type="submit">Pay</button>
</form>`;
});
export {
  Page as default
};
